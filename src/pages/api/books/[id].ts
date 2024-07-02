import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Book , { IBook }from '@/model/book';

// Connect to MongoDB on API route initialization
dbConnect();

// Function to handle PUT request
const updateBook = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// Function to handle DELETE request
const deleteBook = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("heloo")
  try {
   
    console.log("reqquery>>>>",req.query)
    const { id } = req.query;
    const deletedBook = await Book.deleteOne({ _id: id });
    if (!deletedBook) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// Main handler function to route requests based on HTTP method
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query: { id } } = req;
    console.log("method>>>",method)
  switch (method) {
    case 'PUT':
      await updateBook(req, res);
      break;
    case 'DELETE':
      await deleteBook(req, res);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
