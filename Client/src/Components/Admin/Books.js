import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { booksAction } from '../../Redux/Actions/Actions';
import axiosApi from '../../axios/axiosInstance';

const Books = () => {
    const [lgShow, setLgShow] = useState(false);
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [auther, setAuther] = useState();
    const [copies, setCopies] = useState();
    const [publication, setPublication] = useState();
    const [isbn, setISBN] = useState();
    const [year, setYear] = useState();
    const [status, setStatus] = useState()
    const [bookValue, setBookValue] = useState('all')
    const [bookStatus, setBookStatus] = useState('all')
    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState(null)
    // const api = `${axiosApi}/book`
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books.books)


    const navigate = useNavigate()

    const route = () => {
        const getItem = JSON.parse(localStorage.getItem('user'))
        const role = getItem.role
        if (role === 'Admin') {
            navigate('/admin/dashboard')
        }
    }
    route()
    const uniqueObjects = [...new Map(books?.map(item => [item.category, item])).values()]
    const uniqueStatus = [...new Map(books?.map(item => [item.auther, item])).values()]


    useEffect(() => {
        const get = async () => {
            const getting = await axiosApi.get('book/all-books')
            dispatch(booksAction(getting.data))
        }
        get()
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title, category, auther, copies, publication, isbn, year, status
        }
        if (updating === null) {
            try {
                const updateData = await axiosApi.post(`book/register`, data)
                const responseData = updateData.data
                toast(responseData.message)
                dispatch(booksAction(responseData.book))
            } catch (error) {
                toast(error.response.data.message)
            }
            setTitle(''); setCategory(''); setAuther(''); setCopies(''); setPublication('');
            setISBN(''); setYear(''); setStatus('')
            setLgShow(false)
        } else if (updating !== null) {
            try {
                const updateData = await axiosApi.put(`book/update/${updating}`, data)
                const responseData = updateData.data
                toast(responseData.message)
                dispatch(booksAction(responseData.book))
            } catch (error) {
                toast(error.response.data.message)
            }
            setTitle(''); setCategory(''); setAuther(''); setCopies(''); setPublication('');
            setISBN(''); setYear(''); setStatus('')
            setLgShow(false);
            setUpdating(null);
        }
    }
    const handleUpdate = (e) => {
        setLgShow(true); setUpdating(e._id); setTitle(e.title); setCategory(e.category); setAuther(e.auther)
        setCopies(e.copies); setPublication(e.publication); setISBN(e.isbn)
        setYear(e.year); setStatus(e.status);
    }
    const handleDelete = async (id) => {
        const deleteBook = await axiosApi.delete(`book/delete/${id}`);
        const del = deleteBook.data
        toast(del.message)
        dispatch(booksAction(del.book))
    }

    return (
        <div>
            <Nav />
            <Modal size='lg' show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <form method='POST' onSubmit={(e) => handleSubmit(e)}>
                    <div className=' rounded m-3 border  p-1 text-white' style={{ background: '#d04a4a' }}>
                        <i className="bi bi-person-fill fs-5"></i> <span>Books Table</span>
                    </div>
                    <Modal.Body scrollable='true'>
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className='d-flex justify-content-between'>
                                        <label className='col-3'>Title</label>
                                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-1'>
                                        <label className='col-3'>Category</label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select shadow-none">
                                            <option disabled selected></option>
                                            <option value='Periodical'>Periodical</option>
                                            <option value='English'>English</option>
                                            <option value='Math'>Math</option>
                                            <option value='Science'>Science</option>
                                            <option value='Encyclopedia'>Encyclopedia</option>
                                            <option value='General'>General</option>
                                        </select>
                                    </div>
                                    <div className='d-flex justify-content-between mt-1'>
                                        <label className='col-3'>Auther</label>
                                        <input type='text' value={auther} onChange={(e) => setAuther(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-1'>
                                        <label className='col-3'>Book Copies</label>
                                        <input type='number' min='1' max='50' value={copies} onChange={(e) => setCopies(e.target.value)} name="name" className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-1'>
                                        <label className='col-3'>Book Publication</label>
                                        <input type='text' value={publication} onChange={(e) => setPublication(e.target.value)} name="name" className="form-control shadow-none" />
                                    </div>

                                    <div className='d-flex justify-content-between mt-1'>
                                        <label className='col-3'>ISBN</label>
                                        <input type='number' min={1000000000} max={9999999999} value={isbn} onChange={(e) => setISBN(e.target.value)} name="name" className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-1'>
                                        <label className='col-3'>Copyright Year</label>
                                        <input type='number' min={1000} max={9999} value={year} onChange={(e) => setYear(e.target.value)} name="name" className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-1'>
                                        <label className='col-3'>Status</label>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select shadow-none">
                                            <option disabled selected></option>
                                            <option value='New'>New</option>
                                            <option value='Old'>Old</option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <button type="button" className="btn btn-secondary me-1" onClick={() => setLgShow(false)}>Close</button>
                            <button type="submit" className="btn btn-primary shadow-none">Submit</button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
            <div className='container'>
                <div className='row mt-3 d-flex'>

                    <div className=' justify-content-center pt-2 pb-2 w-auto me-1' style={{ border: "1px dashed black" }}>
                        <select className="form-select bg-none shadow-none" onChange={(e) => setBookValue(e.target.value)}>
                            <option value='all'>All Books</option>
                            {uniqueObjects.map(({ category }) => (
                                <option value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className=' justify-content-center pt-2 pb-2 w-auto me-1' style={{ border: "1px dashed black" }}>
                        <select className="form-select bg-none shadow-none" onChange={(e) => setBookStatus(e.target.value)}>
                            <option value='all'>All Authers</option>
                            {uniqueStatus.map(({ auther }) => (
                                <option value={auther}>{auther}</option>
                            ))}
                        </select>
                    </div>
                    <div className=' justify-content-center pt-2 pb-2 w-auto me-1' style={{ border: "1px dashed black" }}>
                        <input type="text" className="form-control shadow-none" placeholder="Search Books..." onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className='ms-auto justify-content-end pt-2 pb-2 w-auto me-1 ' style={{ border: "1px dashed black" }}>
                        <button onClick={() => setLgShow(true)} className='btn btn-success border shadow-none border-radius-none'>Add Book</button>
                    </div>
                </div>
            </div>
            <div className='col-md-12 p-2'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Book Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Auther</th>
                            <th scope="col">Copies</th>
                            <th scope="col">Book Pub</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Copr Year</th>
                            <th scope="col">Date Added</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>




                        {books?.filter((a) => {
                            return bookValue === 'all' || a.category === bookValue
                        }).filter((a) => {
                            return bookStatus === 'all' || a.auther === bookStatus
                        }).filter((val) => {
                            if (search === '') {
                                return val
                            } else if (
                                val.title.toLowerCase().includes(search.toLowerCase()) ||
                                val.category.toLowerCase().includes(search.toLowerCase()) ||
                                val.auther.toLowerCase().includes(search.toLowerCase()) ||
                                val.publication.toLowerCase().includes(search.toLowerCase()) ||
                                val.status.toLowerCase().includes(search.toLowerCase()) ||
                                val.year.includes(search) ||
                                val.isbn.includes(search) ||
                                val.copies.toString().includes(search) ||
                                // val.copies.includes(search) ||
                                val.date.includes(search)
                            ) {
                                return val;
                            }
                            return null
                        }).map((e, id) => (
                            <tr key={e._id}>
                                <td>{e.title}</td>
                                <td>{e.category}</td>
                                <td>{e.auther}</td>
                                <td>{e.copies}</td>
                                <td>{e.publication}</td>
                                <td>{e.isbn}</td>
                                <td>{e.year}</td>
                                <td>{e.date}</td>
                                <td>{e.status}</td>
                                <td>
                                    <i type='button' onClick={() => handleDelete(e._id)} className='bi bi-trash me-2'></i>
                                    <i type='button' onClick={() => handleUpdate(e)} className='bi bi-pencil ms-4'></i>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Books