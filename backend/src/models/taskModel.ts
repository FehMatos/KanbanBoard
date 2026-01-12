import mongoose, { Schema, Document } from "mongoose";

export interface TaskDocument extends Document {
  description: string;
  column: mongoose.Types.ObjectId;
  position: number;
  user_id: string;
}

const taskSchema = new Schema<TaskDocument>({
  description: {
    type: String,
    required: true,
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
export default mongoose.model<TaskDocument>("Task", taskSchema);
