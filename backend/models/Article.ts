import { InferSchemaType, model, Schema } from "mongoose";

export interface Article {
  title: string;
  link: string;
  topic: string;
  time: string;
  saved: boolean;
}

const articleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
  },
  time: {
    type: String,
  },
  saved: {
    type: Boolean,
    default: false,
  },
});

type ArticleModel = InferSchemaType<typeof articleSchema>;

// Export the Article model
export default model<ArticleModel>("Article", articleSchema);
