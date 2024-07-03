import React, { useState, useEffect } from 'react';
import { Author } from '../types';
import axios from 'axios';
import '../styles/all.css';
import Styles from '../styles/Table.module.scss';
import { ChakraProvider ,useToast} from '@chakra-ui/react';

const AuthorTable: React.FC = () => {

  const toast = useToast()
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
  const [deleteAuthor, setDeleteAuthor] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


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
            toast({
              position:'top-right',
              title: "Author added successfully!",
              status: "success",
              duration: 2000,
                })
          

        } catch (error) {
            console.log("error>>>", error)
            toast({
              position:'top-right',
              title: "Something went wrong!",
              status: "error",
              duration: 2000,
                })
          
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
    }, [editData,currentAuthor,deleteAuthor]);



   const handleDeleteAuthor = async(id:string)=>{
    try {
        const result = await axios.delete(`/api/author/${id}`)
        console.log("result>>>",result)
        toast({
          position:'top-right',
          title: "Author delete successfully!",
          status: "success",
          duration: 2000,
            })
            setDeleteAuthor(true)
    } catch (error) {
        console.log("error>>>",error)
        toast({
          position:'top-right',
          title: "Something went wrong!",
          status: "error",
          duration: 2000,
            })
            setDeleteAuthor(false)
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
            const result = await axios.put(`/api/author/${editData?._id}`, object)
            console.log("result>>", result)
            setEditData(null)
            setCurrentAuthor('show')
            toast({
              position:'top-right',
              title: "Author Update successfully!",
              status: "success",
              duration: 2000,
                })
        } catch (error) {
            console.log("error>>>", error)
            toast({
              position:'top-right',
              title: "Something went wrong!",
              status: "error",
              duration: 2000,
                })
        }
    }
   }

   const handlecancel = ()=>{
    setEditData(null)
    setCurrentAuthor('show')
   }


   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const paginatedBooks = authors.slice(startIndex, endIndex)
   
 
    const totalPages = Math.ceil(authors.length / itemsPerPage);

 
    const handlePageChange = (pageNumber :any) => {
      setCurrentPage(pageNumber);
    };



  return (
    <div className={Styles.inside_container}>
      <ChakraProvider/>
      <div className={Styles.book_inside}>
      <h2>Authors</h2>
      <div className={Styles.book_section}>
                    <button className={`list_value ${currentAuthor == 'add' ? Styles.active : ""}`} onClick={() => showAuthor('add')}>{editData ? "Edit author" : "Add Author"}</button>
                    <button className={`list_value ${currentAuthor == 'show' ? Styles.active : ""}`} onClick={() => showAuthor('show')}>Show Author</button>               
            </div>
            {currentAuthor == 'add' ? 
                            <div className={Styles.layout_inside}>
           <form >
            <div className="row">
            <div className="col">
                <label>Name:<span className={Styles.required}>*</span></label><br />
                <input type="text" name='name' className='form-control' value={inputValue.name} onChange={handleChange} /><br />
                <div className={Styles.error}>
                    <p>{error.name}</p>
                </div>
                </div>
                <div className="col">
                <label>Biography:<span className={Styles.required}>*</span></label><br />
                <input type="text" name="biography" className='form-control' value={inputValue.biography} onChange={handleChange} /><br />
                <div className={Styles.error}>
                    <p>{error.biography}</p>
                </div>
                </div>
                </div>

                <div className='row'>
                  <div className='col'>
                <label>Date of Bith:<span className={Styles.required}>*</span></label><br />
                <input type="date" name="dob" className='form-control' value={inputValue.dob} onChange={handleChange} /><br />
                <div className={Styles.error}>
                    <p>{error.dob}</p>
                </div>
                </div>
                <div className='col'>
                <label>Number of Books Published:<span className={Styles.required}>*</span></label><br />
                <input type="number" name="booksPublished" className='form-control' value={inputValue.booksPublished} onChange={handleChange} /><br />
                <div className={Styles.error}>
                    <p>{error.booksPublished}</p>
                </div>
                </div>
                </div>
                <br />
                {!editData ?<button type='submit'className={Styles.sub_btn} onClick={handleSubmit}>Add Author</button>
                  : 
                  <>
                  <button type='submit' className={Styles.cancel_btn} onClick={handlecancel}>Cancel</button>
                  <button type='submit' style={{marginLeft:'10px'}} className={Styles.sub_btn} onClick={handleUpdate}>Update Author</button>
                  </>
                  }
            </form>
            </div>
                :
                currentAuthor == 'show' ?
                <>
                 <div className={Styles.layout_inside}>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th className='scope'>Name</th>
                                <th className='scope'>Biography</th>
                                <th className='scope'>Date of Birth</th>
                                <th className='scope'>Books Published</th>
                                <th className='scope'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedBooks.map((author) => (
                                <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.biography}</td>
                                    <td>{new Date(author.dateOfBirth).toLocaleDateString()}</td>
                                    <td>{author.numberOfBooksPublished}</td>
                                    <td className={Styles.action_btn}>
                                        <button className={Styles.info_btn} onClick={()=>handleEdit(author)}>Edit</button>
                                        <button className={Styles.delete_btn}  style={{marginLeft:'10px'}} onClick={()=>handleDeleteAuthor(author._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={Styles.pagination_button}>
                        <button className="bg-black text-white previous btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> Previous</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="bg-gray-300 text-gray-700 btn next" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                      </div> 
                      </div>
                    </>
                    : ""
            }
            </div>
    </div>
  );
};

export default AuthorTable;
