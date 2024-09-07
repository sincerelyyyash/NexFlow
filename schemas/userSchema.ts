
import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

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
  password: {
    type: String,
    required: true,
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Add a virtual 'id' field
UserSchema.virtual('id').get(function() {
  return this?._id.toHexString();
});

export default models.User || model('User', UserSchema);

