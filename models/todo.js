import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Todo", TodoSchema);
