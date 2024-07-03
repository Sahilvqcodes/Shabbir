import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Author , { IAuthor }from '@/model/author';

// Connect to MongoDB on API route initialization
dbConnect();



// Function to handle PUT request
const updateAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    console.log("id>>>",id)

    console.log("reqbody>>>",req.body)
    const {name, biograpgy, dateOfBirth, numberOfBooksPublished} = req.body;

    const authorDetail = await Author.findById(id);
    console.log("authorDetail>>>>>",authorDetail)

    if(!authorDetail){
      return res.status(404).json({ error: "author not found" });
    }

    if(name){
      authorDetail.name = name;
    }
    if(biograpgy){
      authorDetail.biography = biograpgy
    }
    if(dateOfBirth){
      authorDetail.dateOfBirth =dateOfBirth
    }
    if(numberOfBooksPublished){
      authorDetail.numberOfBooksPublished = numberOfBooksPublished
    }
  
   
    const author = await authorDetail.save()
    console.log("author>>>",author)
   
    res.status(200).json({ success: true, data: author });
  } catch (error) {
    console.log("error>>>",error)
    res.status(400).json({ success: false });
  }
};

// Function to handle DELETE request
const deleteAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const deletedAuthor = await Author.deleteOne({ _id: id });
    if (!deletedAuthor) {
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
