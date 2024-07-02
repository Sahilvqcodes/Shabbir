import mongoose, { Schema, Document,Model } from "mongoose";

export interface IAuthor extends Document {
    name: string;
    biography: string;
    dateOfBirth: Date;
    numberOfBooksPublished: number;
  }

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      biography: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      numberOfBooksPublished: {
        type: Number,
        required: true,
      },
})

const Author: Model<IAuthor> = mongoose.models.Author || mongoose.model<IAuthor>('Author', AuthorSchema);

export default Author;