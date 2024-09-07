
import { Schema, model, models } from 'mongoose';

// Node schema to define nodes in the workflow
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
    additionalData: { type: Schema.Types.Mixed }, // Use specific type if possible
  },
});

// Edge schema to define edges connecting nodes
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
  sourceHandle: { type: String, default: null }, // Optional field
  targetHandle: { type: String, default: null }, // Optional field
});

// Workflow schema to define a workflow document
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
  nodes: [NodeSchema], // Array of nodes
  edges: [EdgeSchema], // Array of edges
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Workflow || model('Workflow', WorkflowSchema);

