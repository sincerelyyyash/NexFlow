
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Workflow from '@/schemas/workflowSchema';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    console.log("Received data:", body); // Log the received data

    const { userId, name, nodes } = body;

    // Validate incoming data
    if (!userId || !name || !Array.isArray(nodes)) {
      console.log("Invalid data received:", { userId, name, nodes });
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }

    // Convert userId to ObjectId
    let convertedUserId;
    try {
      convertedUserId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      console.log("Error converting userId:", error);
      return NextResponse.json({ success: false, error: 'Invalid user ID format' }, { status: 400 });
    }

    // Create a new workflow document
    const newWorkflow = new Workflow({
      userId: convertedUserId,
      name,
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
      }))
    });

    await newWorkflow.save();

    return NextResponse.json({
      success: true,
      message: 'Workflow saved successfully',
      workflowId: newWorkflow._id.toString(),
    });

  } catch (error) {
    console.error('Error saving workflow:', error);
    return NextResponse.json({ success: false, error: 'An error occurred while saving the workflow' }, { status: 500 });
  }
}

