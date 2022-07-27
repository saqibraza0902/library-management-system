// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Nav from '../Nav'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { borrow } from '../../../Redux/Actions/Actions'
import axiosApi from '../../../axios/axiosInstance'

const ViewBorrow = () => {
    const [id, setId] = useState(null)
    const [lgShow, setLgShow] = useState(false);
    const [bookId, setBookId] = useState()
    const borrows  = useSelector(state => state.borrow.borrows)
    // console.log(borrows)
    const dispatch = useDispatch()

    
    var today = new Date();
    var returnDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    const returned = async (e) => {
        setLgShow(false)
        const send = await axiosApi.post(`/borrow/update/${id}`, { returnDate, bookId })
        // getData()
        // console.log(send)
        const getRes = send.data
        dispatch(borrow(getRes.borrow ))
        toast(getRes.message)
    }


    useEffect(() => {
        const getData = async () => {
            // const BorrowApi = 'http://localhost:5000/borrow'
            const borrowData = await axiosApi.get('borrow/all-borrow')
            dispatch(borrow( borrowData.data) )
        }
        getData()
    }, [dispatch])


    const updating = (id, bookId) => {
        setLgShow(true)
        setId(id)
        setBookId(bookId)
    }
    return (
        <div>
            <Nav />
            <Modal show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <div className=' rounded m-3 border  p-1 text-white' style={{ background: '#d04a4a' }}>
                    <i className="bi bi-person-fill fs-5"></i> <span>Return Book</span>
                </div>
                <Modal.Body scrollable='true'>
                    <div className="container ">
                        <div className="row">
                            <div className="col-lg-12">
                                <span className='d-flex justify-content-center'>Do you want to return this book</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary shadow-none' onClick={() => returned()}>Yes</button>
                    <button className='btn btn-secondary shadow-none' onClick={() => setLgShow(false)}>No</button>
                </Modal.Footer>
            </Modal>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Book Title</th>
                                    <th scope="col">Borrower Name</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Borrow Date</th>
                                    <th scope='col'>Status</th>
                                    <th scope="col">Return Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrows?.map((book, id) => (
                                    <tr key={id}>
                                        <td>{book.book.title}</td>
                                        <td>{book.user.name}</td>
                                        <td>{book.dueDate}</td>
                                        <td>{book.borrowDate}</td>
                                        <td>{book.status}</td>
                                        <td>{book.returnDate}</td>
                                        {book.status === 'Returned' ? <td><button className='btn shadow-none' onClick={() => toast('Book already returned')}> Return</button></td> :
                                            <td><button className='btn shadow-none' onClick={() => updating(book._id, book.book._id)}> Return</button></td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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

export default ViewBorrow