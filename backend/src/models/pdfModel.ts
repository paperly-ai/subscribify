import mongoose, { Schema, Document } from 'mongoose';

export interface IPDF extends Document {
  pdfName: string;
  pdfUrl: string;
  pdfIndex: string;
  userId: string;
}

const pdfSchema: Schema = new Schema({
  pdfName: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  pdfIndex: { type: String, required: true },
  userId: { type: String, required: true }
});

export default mongoose.model<IPDF>('PDF', pdfSchema);
