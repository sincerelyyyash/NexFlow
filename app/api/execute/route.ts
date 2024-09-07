
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'querystring';
import fs from 'fs/promises';
import path from 'path';
import dbConnect from '@/lib/dbConnect';
import Workflow from '@/schemas/workflowSchema';
import Execution from '@/schemas/WorkFlowExecutionSchema';
import File from '@/schemas/fileSchema';

function parseCSV(content: string): any[] {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] ? values[index].trim() : '';
      return obj;
    }, {} as any);
  });
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const contentType = request.headers.get('content-type') || '';
    let body: any;
    let file: any;
    let workflowId: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      file = formData.get('file') as File | null;

      workflowId = formData.get('workflowId') as string | undefined;

      if (!file || !workflowId) {
        return NextResponse.json(
          { success: false, error: 'File and Workflow ID are required' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      const fileName = file.name ?? 'unknown';
      const uploadDir = path.join(process.cwd(), 'uploads');

      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);

      file = { originalFilename: fileName, filepath: filePath };
    } else {
      const text = await request.text();

      body = parse(text);

      file = body.file;
      workflowId = body.workflowId as string | undefined;
    }

    if (!file || !workflowId) {
      return NextResponse.json(
        { success: false, error: 'File and Workflow ID are required' },
        { status: 400 }
      );
    }

    const workflow = await Workflow.findById(workflowId).populate('userId');
    if (!workflow) {
      return NextResponse.json({ success: false, error: 'Workflow not found' }, { status: 404 });
    }

    const newFile = new File({
      userId: workflow.userId,
      fileName: file.originalFilename || 'unknown',
      filePath: file.filepath,
    });
    await newFile.save();

    const execution = new Execution({
      workflowId: workflow._id,
      userId: workflow.userId,
      fileName: file.originalFilename || 'unknown',
      status: 'processing',
    });
    await execution.save();

    const fileContent = await fs.readFile(file.filepath, 'utf8');
    let currentData: any[];

    if (file.originalFilename.endsWith('.csv')) {
      currentData = parseCSV(fileContent);
    } else {
      try {
        currentData = JSON.parse(fileContent);
      } catch (error) {
        throw new Error('File content is neither valid JSON nor CSV');
      }
    }

    const nodeOperations: { [key: string]: (data: any) => Promise<any> } = {
      filterData: async (data: any) => {
        return data.map((item: any) => {
          const newItem: any = {};
          for (const key in item) {
            if (typeof item[key] === 'string') {
              newItem[key] = item[key].toLowerCase();
            } else {
              newItem[key] = item[key];
            }
          }
          return newItem;
        });
      },
      wait: async (data: any) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return data;
      },
      convertFormat: async (data: any) => {
        return data;
      },
      sendPostRequest: async (data: any) => {
        try {
          const response = await fetch('https://requestcatcher.com/r/your-endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const responseText = await response.text();

          try {
            return JSON.parse(responseText);
          } catch (error) {
            console.warn('Response is not JSON:', responseText);
            return { message: 'Non-JSON response received', data: responseText };
          }
        } catch (error) {
          console.error('Error in sendPostRequest:', error);
          throw new Error('Failed to send POST request');
        }
      },
    };

    for (const node of workflow.nodes) {
      if (node.type in nodeOperations) {
        try {
          currentData = await nodeOperations[node.type](currentData);
        } catch (error) {
          console.error(`Error in node operation ${node.type}:`, error);
          throw new Error(`Failed to execute operation: ${node.type}`);
        }
      }
    }

    execution.status = 'completed';
    execution.result = currentData;
    await execution.save();

    return NextResponse.json({ success: true, message: 'Workflow executed successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({
      success: false,
      error: 'An error occurred during execution',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

