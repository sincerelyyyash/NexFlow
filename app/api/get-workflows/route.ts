

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import WorkflowModel from "@/schemas/workflowModel";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get('ids');

  if (!ids) {
    try {
      await dbConnect();
      const workflows = await WorkflowModel.find().select('_id name');
      const workflowIds = workflows.map((workflow) => workflow._id.toString());
      return NextResponse.json({ workflowIds });
    } catch (error) {
      console.error('Error fetching workflows:', error);
      return NextResponse.json({ error: 'Failed to fetch workflows' }, { status: 500 });
    }
  } else {
    try {
      await dbConnect();
      const idArray = ids.split(',').map(id => new mongoose.Types.ObjectId(id)); // Use `new` here
      const workflows = await WorkflowModel.find({ _id: { $in: idArray } }).select('_id name');
      return NextResponse.json({ workflows });
    } catch (error) {
      console.error('Error fetching workflows by IDs:', error);
      return NextResponse.json({ error: 'Failed to fetch workflows by IDs' }, { status: 500 });
    }
  }
}

