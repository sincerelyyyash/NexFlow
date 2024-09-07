
import mongoose, { Document, Schema } from 'mongoose';

interface IWorkflow extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  nodes: {
    id: string;
    type: string;
  }[];
}

const WorkflowSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  nodes: [
    {
      id: { type: String, required: true },
      type: { type: String, required: true }
    }
  ]
});

const WorkflowModel = mongoose.models.Workflow || mongoose.model<IWorkflow>('Workflow', WorkflowSchema);

export default WorkflowModel;

