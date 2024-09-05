// app/api/runWorkflow/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseMultipartFormData } from '@/utils/multipart';
import { executeWorkflow } from '@/utils/workflow';

export async function POST(request: NextRequest) {
  try {
    const workflowId = request.nextUrl.searchParams.get('workflowId');
    if (!workflowId) {
      return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
    }

    const formData = await parseMultipartFormData(request);
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    // Execute the workflow
    await executeWorkflow(file, workflowId);

    return NextResponse.json({ message: 'Workflow executed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error executing workflow:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
