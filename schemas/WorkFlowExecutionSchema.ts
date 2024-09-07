
import mongoose, { Schema, Document } from 'mongoose';

interface IExecution extends Document {
  workflowId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  fileName: string;
  status: 'processing' | 'completed' | 'failed';
  result?: any;  // Consider specifying the type if known
}

// Define the schema
const ExecutionSchema: Schema<IExecution> = new Schema({
  workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  status: { type: String, enum: ['processing', 'completed', 'failed'], required: true },
  result: { type: Schema.Types.Mixed }  // Adjust type if possible
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the model if it does not exist yet
const Execution = mongoose.models.Execution || mongoose.model<IExecution>('Execution', ExecutionSchema);

export default Execution;

