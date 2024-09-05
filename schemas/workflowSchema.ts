
import { Schema, model, models } from 'mongoose';

const NodeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['filterData', 'wait', 'convertFormat', 'sendPostRequest'],
    required: true,
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  data: {
    label: { type: String },
    additionalData: { type: Schema.Types.Mixed },
  },
});

const EdgeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  sourceHandle: String,
  targetHandle: String,
});

const WorkflowSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Workflow || model('Workflow', WorkflowSchema);
