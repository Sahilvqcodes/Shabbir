import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import axios from 'axios';
import Styles from '../styles/Table.module.scss';
import { ChakraProvider, useToast } from '@chakra-ui/react';



const BookTable: React.FC = () => {

    const toast = useToast()

    const [books, setBooks] = useState<Book[]>([]);
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
    const [deleteBook, setDeleteBook] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const showBook = (value: any) => {
        setAddBooks(value)
        setEditData(null)
    }



    useEffect(() => {
        if (editData) {
            setInputValue({
                title: editData.title,
                isbn: editData.ISBN,
                //@ts-ignore
                date: editData.publishedDate,
                //@ts-ignore
                quantity: editData.stockQuantity
            });
        } else {
            setInputValue({
                title: "",
                isbn: "",
                //@ts-ignore
                date: "",
                //@ts-ignore
                quantity: ""
            });
        }

    }, [editData])



    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValue((prev) => ({ ...prev, [name]: value }))
        setError((prev) => ({ ...prev, [name]: "" }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let error = false
        if (inputValue.title == '') {
            setError((prev) => ({ ...prev, title: "Name is required *" }))
            error = true
        } else if (inputValue.isbn == '') {
            setError((prev) => ({ ...prev, isbn: "ISBN is required *" }))
            error = true
        } else if (inputValue.date == '') {
            setError((prev) => ({ ...prev, date: "Publish Date is required *" }))
            error = true
        } else if (inputValue.quantity == '') {
            setError((prev) => ({ ...prev, quantity: "Stock quantity is required *" }))
            error = true
        } else {

            const object = {
                title: inputValue.title,
                ISBN: inputValue.isbn,
                publishedDate: inputValue.date,
                stockQuantity: inputValue.quantity
            }

            try {
                const result = await axios.post('/api/books/book', object)
                console.log("result>>", result)
                toast({
                    position: 'top-right',
                    title: "Book added successfully!",
                    status: "success",
                    duration: 2000,
                })

            } catch (error) {
                console.log("error>>>", error)
                toast({
                    position: 'top-right',
                    title: "Something went wrong!",
                    status: "error",
                    duration: 2000,
                })
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
    }, [editData, addBooks, deleteBook]);



    const handleDeleteBook = async (id: string) => {
        try {
            const result = await axios.delete(`/api/books/${id}`)
            console.log("result>>>", result)
            toast({
                position: 'top-right',
                title: "Book deleted successfully!",
                status: "success",
                duration: 2000,
            })
            setDeleteBook(true)

        } catch (error) {
            console.log("error>>>", error)
            toast({
                position: 'top-right',
                title: "Something went wrong!",
                status: "error",
                duration: 2000,
            })
            setDeleteBook(false)
        }

    }


    const handleEdit = (data: any) => {
        setEditData(data)
        setAddBooks('add')
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        e.preventDefault();
        let error = false
        if (inputValue.title == '') {
            setError((prev) => ({ ...prev, title: "Name is required *" }))
            error = true
        } else if (inputValue.isbn == '') {
            setError((prev) => ({ ...prev, isbn: "ISBN is required *" }))
            error = true
        } else if (inputValue.date == '') {
            setError((prev) => ({ ...prev, date: "Publish Date is required *" }))
            error = true
        } else if (inputValue.quantity == '') {
            setError((prev) => ({ ...prev, quantity: "Stock quantity is required *" }))
            error = true
        } else {

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
                toast({
                    position: 'top-right',
                    title: "Book update successfully!",
                    status: "success",
                    duration: 2000,
                })

            } catch (error) {
                console.log("error>>>", error)
                toast({
                    position: 'top-right',
                    title: "Something went wrong!",
                    status: "error",
                    duration: 2000,
                })
            }
        }
    }

    const handlecancel = () => {
        setEditData(null)
        setAddBooks('show')
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex)
    

    const totalPages = Math.ceil(books.length / itemsPerPage);
    

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div className={Styles.inside_container}>
            <ChakraProvider />
            <div className={Styles.book_inside}>
            <h2>Books</h2>
            <div className={Styles.book_section}>
                <button className={`list_value ${addBooks == 'add' ? Styles.active : ""}`} onClick={() => showBook('add')}>{editData ? 'Edit Book' : 'Add Book'}</button>
                <button className={`list_value ${addBooks == 'show' ? Styles.active : ""}`} onClick={() => showBook('show')}>Show Books</button>
            </div>
            
            {addBooks == 'add' ? 
            <div className={Styles.layout_inside}>
           <form>
                <div className="row">
                    <div className="col">
                        <label>Title:<span className={Styles.required}>*</span></label><br />
                        <input type="text" name='title' className='form-control' value={inputValue.title} onChange={handleChange} />
                        <div className={Styles.error}>
                            <p>{error.title}</p>
                        </div>
                    </div>
                    <div className="col">
                        <label>ISBN:<span className={Styles.required}>*</span></label><br />
                        <input type="text" name="isbn" className='form-control' value={inputValue.isbn} onChange={handleChange} />
                        <div className={Styles.error}>
                            <p>{error.isbn}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Published Date:<span className={Styles.required}>*</span></label><br />
                        <input type="date" name="date" className='form-control' value={inputValue.date} onChange={handleChange} />
                        <div className={Styles.error}>
                            <p>{error.date}</p>
                        </div>
                    </div>
                    <div className="col">
                        <label>Stock Quantity:<span className={Styles.required}>*</span></label><br />
                        <input type="number" name="quantity" className='form-control' value={inputValue.quantity} onChange={handleChange} />
                        <div className={Styles.error}>
                            <p>{error.quantity}</p>
                        </div>
                    </div>
                </div>
                <br />
                {!editData ? <button type='submit' className={Styles.sub_btn} onClick={handleSubmit}>Add Book</button>
                    :
                    <>
                        <button type='submit' className={Styles.cancel_btn} onClick={handlecancel}>Cancel</button>
                        <button type='submit' style={{marginLeft:'10px'}} className={Styles.sub_btn} onClick={handleUpdate}>Update Book</button>
                    </>
                }
            </form>
            </div>
                :
                addBooks == 'show' ?
                    <>
                    <div className={Styles.layout_inside}>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th className='scope'>Title</th>
                                    <th className='scope'>ISBN</th>
                                    <th className='scope'>Published Date</th>
                                    <th className='scope'>Stock Quantity</th>
                                    <th className='scope'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedBooks.map((book) => (
                                    <tr key={book._id}>
                                        <td>{book.title}</td>
                                        <td>{book.ISBN}</td>
                                        <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                                        <td>{book.stockQuantity}</td>
                                        <td>
                                            <button className={Styles.info_btn} onClick={() => handleEdit(book)}>Edit</button>
                                            <button className={Styles.delete_btn} style={{ marginLeft: '10px' }} onClick={() => handleDeleteBook(book._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={Styles.pagination_button}>
                            <button className="bg-black text-white btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}> Previous</button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button className={`bg-gray-300 text-gray-700 btn ${Styles.next}`} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                        </div>
                        </div>
                    </>
                    : ""
            }
            </div>
        </div>
    );
};

export default BookTable;
