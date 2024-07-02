import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Author from '@/model/author';

// Connect to MongoDB on API route initialization
dbConnect();

// Function to handle GET request
const getAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const books = await Author.find({});
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// Function to handle POST request
const createAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("reqbody>>>",req.body)
  try {

   const authorData = new Author({
    name:req.body.name,
    biography:req.body.biograpgy,
    dateOfBirth:req.body.dateOfBirth,
    numberOfBooksPublished:req.body.numberOfBooksPublished
   })
   console.log("authorData>>>",authorData)

   const saveData = await authorData.save()
    res.status(201).json({ success: true, data: saveData });
  } catch (error) {
    console.log("error>>>",error)
    res.status(400).json({ success: false });
  }
};




// Main handler function to route requests based on HTTP method
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await getAuthor(req, res);
      break;
    case 'POST':
      await createAuthor(req, res);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
