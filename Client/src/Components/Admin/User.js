import React, { useEffect, useState } from 'react'
import Nav from './Nav';
// import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axiosApi from '../../axios/axiosInstance';

const User = () => {
    const [user, setUser] = useState([])
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [role, setRole] = useState()
    const [getRole, setGetRole] = useState(null)
    const [password, setPassword] = useState()
    const [updating, setUpdating] = useState(null)
    const [lgShow, setLgShow] = useState(false);
    // const api = `${axiosApi}/user`

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset()
        const data = {
            firstname, lastname, email, phone, role, password
        }

        if (updating === null) {
            try {
                const updateData = await axiosApi.post(`/user/register`, data)
                const responseData = updateData.data
                toast(responseData.message)
                setUser(responseData.user)
            } catch (error) {
                toast(error.response.data.message)
            }
            setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setPassword(''); setRole('')
            setLgShow(false);
        } else if (updating !== null) {
            try {
                const updateData = await axiosApi.patch(`/user/update/${updating}`, data)
                const responseData = updateData.data
                toast(responseData.message)
                setUser(responseData.user)
            } catch (error) {
                toast(error.response.data.message)
            }
            setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setPassword(''); setRole('')
            setLgShow(false); setUpdating(null);
        }
    }
    const handleDelete = async (id) => {
        const deleteUser = await axiosApi.delete(`user/delete/${id}`);
        const del = deleteUser.data
        setUser(del.user)
        toast(deleteUser.data.message)
    }
    useEffect(() => {
        const get = async () => {
            const getting = await axiosApi.get('user/all-users')
            setUser(getting.data)
        }
        get()
        getting()
    }, [])

    const handleUpdate = (e) => {
        setLgShow(true)
        setUpdating(e._id)
        setFirstName(e.firstname);
        setLastName(e.lastname);
        setEmail(e.email);
        setPhone(e.phone);
        setRole(e.role)
        setPassword(e.password);
    }
    const getting = () => {
        const getrole = JSON.parse(localStorage.getItem('user'))
        if (getrole.role === 'Super Admin') {
            setGetRole(1)
        }
    }
    return (
        <div>
            <Nav />
            <Modal show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <form method='POST' onSubmit={(e) => handleSubmit(e)}>
                    <div className=' rounded m-3 border  p-1 text-white' style={{ background: '#d04a4a' }}>
                        <i className="bi bi-person-fill fs-5"></i> <span>Users Table</span>
                    </div>
                    <Modal.Body scrollable='true'>
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className='d-flex justify-content-between'>
                                        <label className='col-3'>First Name</label>
                                        <input type='text' value={firstname || ''} onChange={(e) => setFirstName(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Last Name</label>
                                        <input type='text' value={lastname || ''} onChange={(e) => setLastName(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Email</label>
                                        <input type='email' value={email || ''} onChange={(e) => setEmail(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Phone No</label>
                                        <input type='number' value={phone || ''} onChange={(e) => setPhone(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Role</label>
                                        <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select shadow-none">
                                            <option disabled selected></option>
                                            <option value='Super Admin'>Super Admin</option>
                                            <option value='Admin'>Admin</option>
                                        </select>
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Password</label>
                                        <input type='password' value={password || ''} onChange={(e) => setPassword(e.target.value)} className="form-control shadow-none" />
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
                <div className='row mt-4'>
                    {getRole === 1 ?
                        <div className='pt-2 pb-2 w-auto' style={{ border: "1px dashed black" }}>
                            <button onClick={() => setLgShow(true)} className='btn shadow-none border border-radius-none'><i className=' bi bi-plus-lg pe-2'></i>Add User</button>
                        </div>
                        :
                        <div className='pt-2 pb-2 w-auto' style={{ border: "1px dashed black" }}>
                            <button onClick={() => toast('You can not add user')} className='btn shadow-none border border-radius-none'><i className=' bi bi-plus-lg pe-2'></i>Add User</button>
                        </div>
                    }

                    <div className='col-10'>

                        <div className='col-md-12  rounded pt-1 pb-2 ps-2 pe-2 border text-white' style={{ background: '#d04a4a' }}>
                            <i className="bi bi-person-fill fs-5 me-1"></i> <span>Users Table</span>
                        </div>
                    </div>

                    <div className=' mt-4 '>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">FirstName</th>
                                    <th scope="col">LastName</th>
                                    <th scope="col">Email</th>
                                    <th>Phone No.</th>
                                    <th>Role</th>
                                    <th scope="col">Password</th>
                                    {getRole === 1 ? <th scope="col">Action</th>
                                        :
                                        <th scope="col">Action</th>
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {user.map((e, id) => (
                                    <tr key={e._id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{e.firstname}</td>
                                        <td>{e.lastname}</td>
                                        <td>{e.email}</td>
                                        <td>{e.phone}</td>
                                        <td>{e.role}</td>
                                        <td>{e.password}</td>
                                        {getRole === 1 ?
                                            <td>
                                                <i type='button' onClick={() => handleDelete(e._id)} className='bi bi-trash me-2'></i>
                                                <i type='button' onClick={() => handleUpdate(e)} className='bi bi-pencil ms-4'></i>
                                            </td> :
                                            <td>
                                                <i type='button' onClick={() => toast('You Can not delete user')} className='bi bi-trash me-2'></i>
                                                <i type='button' onClick={() => toast('You Can not Edit User')} className='bi bi-pencil ms-4'></i>
                                            </td>
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

export default User