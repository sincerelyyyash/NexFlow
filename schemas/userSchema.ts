
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
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
  },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });


UserSchema.virtual('id').get(function() {
  return this && this._id ? this._id.toHexString() : null;
});

export default models.User || model('User', UserSchema);

