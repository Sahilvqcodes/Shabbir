import React, { useState, useEffect } from 'react';
import { Author } from '../types';
import axios from 'axios';
import '../styles/all.css';

const AuthorTable: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState('show');
    const [inputValue, setInputValue] = useState({
        name: "",
        biography: "",
        dob: "",
        booksPublished: ""
    });

    const [error, setError] = useState({
      name: "",
      biography: "",
      dob: "",
      booksPublished: ""
  });
  const [editData, setEditData] = useState<Author | null>(null);



  useEffect(() => {
    if(editData){
      setInputValue({
          name: editData.name,
          biography: editData.biography,
         //@ts-ignore
         dob:editData.dateOfBirth,
         //@ts-ignore
         booksPublished: editData.numberOfBooksPublished
      });
    }else{
      setInputValue({
        name: "",
        biography: "",
        dob: "",
        booksPublished: ""
      });
    }
  
  }, [editData])
  

    const showAuthor = (value: any) => {
      setCurrentAuthor(value)
      setEditData(null)
    }


    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValue((prev) => ({ ...prev, [name]: value }))
        setError((prev) => ({ ...prev, [name]: '' }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("inputvalue>>>", inputValue)
        let error = false
        if(inputValue.name ==''){
          setError((prev)=>({...prev,name:"Name is required *"}))
          error = true
        }else if(inputValue.biography ==''){
          setError((prev)=>({...prev,biography:"BioGraphy is required *"}))
          error = true
        }else if(inputValue.dob ==''){
          setError((prev)=>({...prev,dob:"Date of birth is required *"}))
          error = true
        }else if(inputValue.booksPublished ==''){
          setError((prev)=>({...prev,booksPublished:"Published books is required *"}))
          error = true
        }else{

        const object = {
            name: inputValue.name,
            biograpgy: inputValue.biography,
            dateOfBirth: inputValue.dob,
            numberOfBooksPublished: inputValue.booksPublished
        }

        try {
            const result = await axios.post('/api/author/auth', object)
            console.log("result>>", result)

        } catch (error) {
            console.log("error>>>", error)
        }
      }
    }



    const getAuthorData = async () => {
        try {
            const result = await axios.get('/api/author/auth');
            console.log("result>>>", result)
            setAuthors(result.data.data)
        } catch (error) {
            console.log("error>>>", error)
        }
    }

    useEffect(() => {
      getAuthorData()
    }, [editData]);



   const handleDeleteAuthor = async(id:string)=>{
    try {
        const result = await axios.delete(`/api/author/${id}`)
        console.log("result>>>",result)
    } catch (error) {
        console.log("error>>>",error)
    }

   }

   const handleEdit = (data:any)=>{
    setEditData(data)
    setCurrentAuthor('add')
   }

   const handleUpdate=async(e: React.FormEvent)=>{
   
    e.preventDefault();
        let error = false
        if(inputValue.name ==''){
          setError((prev)=>({...prev,title:"Name is required *"}))
          error = true
        }else if(inputValue.biography ==''){
          setError((prev)=>({...prev,isbn:"ISBN is required *"}))
          error = true
        }else if(inputValue.dob ==''){
          setError((prev)=>({...prev,date:"Publish Date is required *"}))
          error = true
        }else if(inputValue.booksPublished ==''){
          setError((prev)=>({...prev,quantity:"Stock quantity is required *"}))
          error = true
        }else{

        const object = {
          name: inputValue.name,
          biograpgy: inputValue.biography,
          dateOfBirth: inputValue.dob,
          numberOfBooksPublished: inputValue.booksPublished
        }

        try {
            const result = await axios.put(`/api/books/${editData?._id}`, object)
            console.log("result>>", result)
            setEditData(null)
            setCurrentAuthor('show')
        } catch (error) {
            console.log("error>>>", error)
        }
    }
   }

   const handlecancel = ()=>{
    setEditData(null)
    setCurrentAuthor('show')
   }





  return (
    <div>
      <h2>Authors</h2>
      <div className='book-section'>
                <ul>
                    <li className={`list_value ${currentAuthor == 'add' ? 'active' : ""}`} onClick={() => showAuthor('add')}>Add Book</li>
                    <li className={`list_value ${currentAuthor == 'show' ? 'active' : ""}`} onClick={() => showAuthor('show')}>Show Books</li>
                </ul>
            </div>
            {currentAuthor == 'add' ? <form >
                <label>Name:</label><br />
                <input type="text" name='name' value={inputValue.name} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.name}</p>
                </div>
                <label>Biography:</label><br />
                <input type="text" name="biography" value={inputValue.biography} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.biography}</p>
                </div>
                <label>Date of Bith:</label><br />
                <input type="date" name="dob" value={inputValue.dob} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.dob}</p>
                </div>
                <label>Number of Books Published:</label><br />
                <input type="number" name="booksPublished" value={inputValue.booksPublished} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.booksPublished}</p>
                </div>
                <br />
                {!editData ?<button type='submit' onClick={handleSubmit}>Add Author</button>
                  : 
                  <>
                  <button type='submit' onClick={handlecancel}>Cancel</button>
                  <button type='submit' onClick={handleUpdate}>Update Author</button>
                  </>
                  }
            </form>
                :
                currentAuthor == 'show' ?
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Biography</th>
                                <th>Date of Birth</th>
                                <th>Number of Books Published</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author) => (
                                <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.biography}</td>
                                    <td>{new Date(author.dateOfBirth).toLocaleDateString()}</td>
                                    <td>{author.numberOfBooksPublished}</td>
                                    <td>
                                        <button onClick={()=>handleEdit(author)}>Edit</button>
                                        <button onClick={()=>handleDeleteAuthor(author._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : ""
            }
    </div>
  );
};

export default AuthorTable;
