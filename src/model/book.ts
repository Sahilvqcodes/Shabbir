import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    ISBN: string;
    publishedDate: Date;
    stockQuantity: number;
  }

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      ISBN: {
        type: String,
        required: true,
      },
      publishedDate: {
        type: Date,
        required: true,
      },
      stockQuantity: {
        type: Number,
        required: true,
      },
})

const Book = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;