
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Workflow from '@/schemas/workflowSchema';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, name, nodes, edges } = body;

    if (!userId || !name || !Array.isArray(nodes) || !Array.isArray(edges)) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }

    const newWorkflow = new Workflow({
      userId: new Object(userId),
      name,
      nodes,
      edges,
    });

    await newWorkflow.save();

    return NextResponse.json({ success: true, message: 'Workflow saved successfully', workflowId: newWorkflow._id });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'An error occurred while saving the workflow' }, { status: 500 });
  }
}
