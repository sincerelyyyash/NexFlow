
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  workflows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Workflow',
    },
  ],
  password: {
    type: String,
    required: true,
  }
});

export default models.User || model('User', UserSchema);

