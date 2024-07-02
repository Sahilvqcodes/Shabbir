import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import axios from 'axios';
import Styles from '../styles/Table.module.scss';
import '../styles/all.css';

const BookTable: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    console.log("books>>>", books)
    const [addBooks, setAddBooks] = useState('show')
    const [inputValue, setInputValue] = useState({
        title: "",
        isbn: "",
        date: "",
        quantity: ""
    });
    const [error, setError] = useState({
        title: "",
        isbn: "",
        date: "",
        quantity: ""
    });

    const [editData, setEditData] = useState<Book | null>(null);
    console.log("editData>>>",editData)

    const showBook = (value: any) => {
        setAddBooks(value)
        setEditData(null) 
    }



    useEffect(() => {
      if(editData){
        setInputValue({
            title: editData.title,
            isbn: editData.ISBN,
           //@ts-ignore
            date:editData.publishedDate,
           //@ts-ignore
            quantity: editData.stockQuantity
        });
      }else{
        setInputValue({
            title: "",
            isbn:"",
           //@ts-ignore
            date:"",
           //@ts-ignore
            quantity: ""
        });
      }
    
    }, [editData])
    


    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValue((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let error = false
        if(inputValue.title ==''){
          setError((prev)=>({...prev,title:"Name is required *"}))
          error = true
        }else if(inputValue.isbn ==''){
          setError((prev)=>({...prev,isbn:"ISBN is required *"}))
          error = true
        }else if(inputValue.date ==''){
          setError((prev)=>({...prev,date:"Publish Date is required *"}))
          error = true
        }else if(inputValue.quantity ==''){
          setError((prev)=>({...prev,quantity:"Stock quantity is required *"}))
          error = true
        }else{

        const object = {
            title: inputValue.title,
            ISBN: inputValue.isbn,
            publishedDate: inputValue.date,
            stockQuantity: inputValue.quantity
        }

        try {
            const result = await axios.post('/api/books/book', object)
            console.log("result>>", result)

        } catch (error) {
            console.log("error>>>", error)
        }
    }
    }



    const getBookData = async () => {
        try {
            const result = await axios.get('/api/books/book');
            console.log("result>>>", result)
            setBooks(result.data.data)
        } catch (error) {
            console.log("error>>>", error)
        }
    }

    useEffect(() => {
        getBookData()
    }, [editData]);



   const handleDeleteBook = async(id:string)=>{
    try {
        const result = await axios.delete(`/api/books/${id}`)
        console.log("result>>>",result)
    } catch (error) {
        console.log("error>>>",error)
    }

   }


   const handleEdit = (data:any)=>{
    setEditData(data)
    setAddBooks('add')
   }

   const handleUpdate=async(e: React.FormEvent)=>{
    e.preventDefault()

    e.preventDefault();
        let error = false
        if(inputValue.title ==''){
          setError((prev)=>({...prev,title:"Name is required *"}))
          error = true
        }else if(inputValue.isbn ==''){
          setError((prev)=>({...prev,isbn:"ISBN is required *"}))
          error = true
        }else if(inputValue.date ==''){
          setError((prev)=>({...prev,date:"Publish Date is required *"}))
          error = true
        }else if(inputValue.quantity ==''){
          setError((prev)=>({...prev,quantity:"Stock quantity is required *"}))
          error = true
        }else{

        const object = {
            title: inputValue.title,
            ISBN: inputValue.isbn,
            publishedDate: inputValue.date,
            stockQuantity: inputValue.quantity
        }

        try {
            const result = await axios.put(`/api/books/${editData?._id}`, object)
            console.log("result>>", result)
            setEditData(null)
            setAddBooks('show')
        } catch (error) {
            console.log("error>>>", error)
        }
    }
   }

   const handlecancel = ()=>{
    setEditData(null)
    setAddBooks('show')
   }

    return (
        <div>
            <h2>Books</h2>
            <div className='book-section'>
                <ul>
                    <li className={`list_value ${addBooks == 'add' ? 'active' : ""}`} onClick={() => showBook('add')}>{editData ? 'Edit Book':'Add Book'}</li>
                    <li className={`list_value ${addBooks == 'show' ? 'active' : ""}`} onClick={() => showBook('show')}>Show Books</li>
                </ul>
            </div>
            {addBooks == 'add' ? <form >
                <label>Title:</label><br />
                <input type="text" name='title' value={inputValue.title} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.title}</p>
                </div>
                <label>ISBN:</label><br />
                <input type="text" name="isbn" value={inputValue.isbn} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.isbn}</p>
                </div>
                <label>Published Date:</label><br />
                <input type="date" name="date" value={inputValue.date} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.date}</p>
                </div>
                <label>Stock Quantity:</label><br />
                <input type="number" name="quantity" value={inputValue.quantity} onChange={handleChange} /><br />
                <div className='error'>
                    <p>{error.quantity}</p>
                </div>
                <br />
                {!editData ?<button type='submit' onClick={handleSubmit}>Add Book</button>
                  : 
                  <>
                  <button type='submit' onClick={handlecancel}>Cancel</button>
                  <button type='submit' onClick={handleUpdate}>Update Book</button>
                  </>
                  }
            </form>
                :
                addBooks == 'show' ?
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>ISBN</th>
                                <th>Published Date</th>
                                <th>Stock Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.ISBN}</td>
                                    <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                                    <td>{book.stockQuantity}</td>
                                    <td>
                                        <button onClick={()=>handleEdit(book)}>Edit</button>
                                        <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
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

export default BookTable;
