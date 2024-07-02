import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Author , { IAuthor }from '@/model/author';

// Connect to MongoDB on API route initialization
dbConnect();



// Function to handle PUT request
const updateAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const book = await Author.findByIdAndUpdate(id, req.body, {
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
const deleteAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const deletedBook = await Author.deleteOne({ _id: id });
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
  const { method } = req;

  switch (method) {
    case 'PUT':
      await updateAuthor(req, res);
      break;
    case 'DELETE':
      await deleteAuthor(req, res);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
