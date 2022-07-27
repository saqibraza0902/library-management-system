// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Nav from '../Nav'
import '../../css/index.css'
import { toast, ToastContainer } from 'react-toastify';
import axiosApi from '../../../axios/axiosInstance';

const Borrow = () => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState()
    const [members, setMembers] = useState([]);
    const [user, setUser] = useState();
    const [dueDate, setDueDate] = useState()

    // const BooksApi = 'http://localhost:5000/book/all-books';
    // const MembersApi = 'http://localhost:5000/member/all-members';
    var today = new Date();
    var borrowDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()



    useEffect(() => {
        const getData = async () => {
            const BookData = await axiosApi.get('/book/all-books')
            const MembersData = await axiosApi.get('member/all-members')
            setBooks(BookData.data)
            setMembers(MembersData.data)
        }
        getData();

    }, [])
    // const BorrowApi = 'http://localhost:5000/borrow'
    const onSubmit = async (e) => {
        e.preventDefault();
        const borrowing = await axiosApi.post('borrow/register', {
            book, user, borrowDate, dueDate,
        })
        e.target.reset()
        toast(borrowing.data.message)
        setDueDate(''); setUser('');
    }
    return (
        <div>
            <Nav />
            <div className='conatiner'>
                <div className='row d-flex justify-content-center m-2'>
                    <div className='col-12'>
                        <div className=' rounded border p-1 text-white' style={{ background: '#d04a4a' }}>
                            <i className="bi bi-person-fill "></i> <span>Borrow Table</span>
                        </div>
                    </div>
                </div>
                <form method='POST' onSubmit={(e) => onSubmit(e)}>
                    <div className='row pt-3 m-2'>
                        <div className='col-3'>
                            <div>
                                <label>Borrower Name</label>
                                <select value={user} onChange={(e) => setUser(e.target.value)} className="form-select shadow-none">
                                    <option selected disabled></option>
                                    {members.filter((resp) => resp.status !== 'Banned').map((member, id) => (
                                        <option key={id} value={member._id}>{member.name}</option>
                                    )
                                    )}
                                </select>
                            </div>
                            <div>
                                <label>Due Date</label>
                                <input type="date" onChange={(e) => setDueDate(e.target.value)} data-date-format="DD MMMM YYYY" className="form-control shadow-none" placeholder='MM' value={dueDate} />
                            </div>
                            <div>
                                <button type='submit' className='btn border mt-1'>Submit</button>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className=' rounded border p-1 text-white' style={{ background: '#dff0d8', height: '40px' }}>
                                {/* <marquee className='text-dark text-uppercase '>You Can Borrow Only One Book at a Time.</marquee> */}
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Auther</th>
                                        <th scope="col">ISBN</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Status</th>
                                        <th scope='col'>ADD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.filter((resp) => resp.status !== 'Lost').map((book, id) => (
                                        <tr key={id}>
                                            <td>{book.title}</td>
                                            <td>{book.auther}</td>
                                            <td>{book.isbn}</td>
                                            <td>{book.year}</td>
                                            <td>{book.status}</td>
                                            <td><input type='radio' value={book} onChange={() => setBook(book._id)} name='abc' /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </div>
                    </div>

                </form>
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

export default Borrow