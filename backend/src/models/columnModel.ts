import mongoose, { Schema, Document } from "mongoose";

export interface ColumnDocument extends Document {
  title: string;
  color: string;
  position: number;
  user_id: string;
}

const columnSchema = new Schema<ColumnDocument>({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#29333c",
  },
  position: {
    type: Number,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
export default mongoose.model<ColumnDocument>("Column", columnSchema);
