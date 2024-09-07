
import mongoose, { Schema, Document } from 'mongoose';

interface IFile extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  fileName: string;
  filePath: string;
}

const FileSchema: Schema<IFile> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
});

const File = mongoose.models.File || mongoose.model<IFile>('File', FileSchema);

export default File;

