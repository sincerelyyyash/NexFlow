
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Workflow from '@/schemas/workflowSchema';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, name, nodes, edges } = body;

    // Validate incoming data
    if (!userId || !name || !Array.isArray(nodes) || !Array.isArray(edges)) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }

    // Convert userId to ObjectId
    let convertedUserId;
    try {
      convertedUserId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Invalid user ID format' }, { status: 400 });
    }

    // Create a new workflow document
    const newWorkflow = new Workflow({
      userId: convertedUserId,
      name,
      nodes,
      edges,
    });

    await newWorkflow.save();

    return NextResponse.json({
      success: true,
      message: 'Workflow saved successfully',
      workflowId: newWorkflow._id.toString(), // Convert ObjectId to string
    });

  } catch (error) {
    console.error('Error saving workflow:', error);
    return NextResponse.json({ success: false, error: 'An error occurred while saving the workflow' }, { status: 500 });
  }
}

