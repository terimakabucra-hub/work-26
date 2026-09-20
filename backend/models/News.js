import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, default: "General" },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, default: "" },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export default News;
