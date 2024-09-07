
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Workflow from '@/schemas/workflowSchema';
import Execution from '@/schemas/WorkFlowExecutionSchema';
import File from '@/schemas/fileSchema';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const workflowId = formData.get('workflowId') as string;

    if (!file || !workflowId) {
      return NextResponse.json({ success: false, error: 'File and Workflow ID are required' }, { status: 400 });
    }

    const workflow = await Workflow.findById(workflowId).populate('userId');
    if (!workflow) {
      return NextResponse.json({ success: false, error: 'Workflow not found' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'uploads', file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await readFile(filePath, { encoding: 'utf8' });
    await writeFile(filePath, fileBuffer);

    const newFile = new File({
      userId: workflow.userId,
      fileName: file.name,
      filePath: filePath,
    });
    await newFile.save();

    const execution = new Execution({
      workflowId: workflow._id,
      userId: workflow.userId,
      fileName: file.name,
      status: 'processing',
    });
    await execution.save();

    const results: any[] = [];
    const nodeOperations: { [key: string]: (data: any) => Promise<any> } = {
      filterData: async (data: any) => {
        return data.filter((item: any) => item.isValid);
      },
      wait: async (data: any) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return data;
      },
      convertFormat: async (data: any) => {
        return data.map((item: any) => ({ ...item, converted: true }));
      },
      sendPostRequest: async (data: any) => {
        const response = await fetch('https://example.com/api/endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        return response.json();
      },
    };

    let currentData = JSON.parse(await readFile(filePath, 'utf8'));

    for (const node of workflow.nodes) {
      if (node.type in nodeOperations) {
        currentData = await nodeOperations[node.type](currentData);
      }
    }

    execution.status = 'completed';
    execution.result = results;
    await execution.save();

    return NextResponse.json({ success: true, message: 'Workflow executed successfully' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'An error occurred during execution' }, { status: 500 });
  }
}

async function writeFile(filePath: string, data: Buffer) {
  const fs = require('fs/promises');
  await fs.writeFile(filePath, data);
}

