import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Book , { IBook }from '@/model/book';

// Connect to MongoDB on API route initialization
dbConnect();

// Function to handle GET request
const getBooks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// Function to handle POST request
const createBook = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("reqbody>>>",req.body)
  try {

   const bookData = new Book({
    title:req.body.title,
    ISBN:req.body.ISBN,
    publishedDate:req.body.publishedDate,
    stockQuantity:req.body.stockQuantity
   })

   const saveData = await bookData.save()
    res.status(201).json({ success: true, data: saveData });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};



// Main handler function to route requests based on HTTP method
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query: { id } } = req;
    console.log("method>>>",method)
  switch (method) {
    case 'GET':
      await getBooks(req, res);
      break;
    case 'POST':
      await createBook(req, res);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
