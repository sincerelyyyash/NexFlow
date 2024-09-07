
import mongoose from 'mongoose';

const workflowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nodes: [
    {
      id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: [
          'filterData',
          'wait',
          'convertFormat',
          'sendPostRequest',
          'input',
          'output'
        ],
        required: true
      }
    }
  ]
});

const Workflow = mongoose.models.Workflow || mongoose.model('Workflow', workflowSchema);

export default Workflow;

