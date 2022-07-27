import React, { useEffect, useState } from 'react'
import Nav from './Nav';
// import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import axiosApi from '../../axios/axiosInstance';

const Member = () => {
    const [member, setMember] = useState([])
    const [name, setName] = useState()
    const [gender, setGender] = useState()
    const [address, setAddress] = useState()
    const [contact, setContact] = useState()
    const [type, setType] = useState()
    const [yearlevel, setYearLevel] = useState()
    const [status, setStatus] = useState()
    const [updating, setUpdating] = useState(null)
    const [lgShow, setLgShow] = useState(false);
    // const api = `${axiosApi}/member`

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name, gender, address, contact, type, yearlevel, status
        }
        if (updating === null) {
            try {
                const updateData = await axiosApi.post(`member/register`, data)
                const responseData = updateData.data
                toast(responseData.message)
                setMember(responseData.member)
            } catch (error) {
                toast(error.response.data.message)
            }
            setName(''); setGender(''); setAddress(''); setContact(''); setType(''); setYearLevel(''); setStatus('')
            setLgShow(false)
        } else if (updating !== null) {
            try {
                const updateData = await axiosApi.patch(`member/update/${updating}`, data)
                const responseData = updateData.data
                toast(responseData.message)
                setMember(responseData.member)
            } catch (error) {
                toast(error.response.data.message)
            }
            setName(''); setGender(''); setAddress(''); setContact(''); setType(''); setYearLevel(''); setStatus('')
            setLgShow(false); setUpdating(null);
        }
    }
    useEffect(() => {
        const get = async () => {
            const getting = await axiosApi.get(`member/all-members`)
            setMember(getting.data)
        }
        get()
    }, [])
    const handleDelete = async (id) => {
        const deleteMember = await axiosApi.delete(`member/delete/${id}`);
        const del = deleteMember.data
        setMember(del.member)
        toast(del.message)
        console.log(deleteMember)
    }
    const handleUpdate = (e) => {
        setLgShow(true)
        setUpdating(e._id)
        setName(e.name);
        setGender(e.gender);
        setAddress(e.address)
        setContact(e.contact)
        setType(e.type)
        setYearLevel(e.yearlevel)
        setStatus(e.status)
    }
    const getItem = JSON.parse(localStorage.getItem('user'))
    const role = getItem.role
    return (
        <div>
            <Nav />
            <Modal show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <form method='POST' onSubmit={(e) => handleSubmit(e)}>
                    <div className=' rounded m-3 border  p-1 text-white' style={{ background: '#d04a4a' }}>
                        <i className="bi bi-person-fill fs-5"></i> <span>Members Table</span>
                    </div>
                    <Modal.Body scrollable='true'>
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className='d-flex justify-content-between'>
                                        <label className='col-3'>Name</label>
                                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Gender</label>
                                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select shadow-none">
                                            <option disabled selected></option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Address</label>
                                        <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Contact</label>
                                        <input type='number' value={contact} onChange={(e) => setContact(e.target.value)} name="name" className="form-control shadow-none" />
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Type</label>
                                        <select value={type} onChange={(e) => setType(e.target.value)} className="form-select shadow-none">
                                            <option disabled selected></option>
                                            <option value='Student'>Student</option>
                                            <option value='Teacher'>Teacher</option>
                                        </select>
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Year Level</label>
                                        <select value={yearlevel} onChange={(e) => setYearLevel(e.target.value)} className="form-select shadow-none">
                                            <option disabled selected></option>
                                            <option value='First Year'>First Year</option>
                                            <option value='Second Year'>Second Year</option>
                                            <option value='Third Year'>Third Year</option>
                                            <option value='Forth Year'>Forth Year</option>
                                            <option value='Faculity'>Faculity</option>
                                        </select>
                                    </div>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <label className='col-3'>Status</label>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select shadow-none">
                                            <option disabled selected></option>
                                            <option value='Active'>Active</option>
                                            <option value='Banned'>Banned</option>
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
                <div className='row mt-4'>
                    {
                        role === 'Admin' ?
                            <div className=' justify-content-center pt-2 pb-2 w-auto' style={{ border: "1px dashed black" }}>
                                <button onClick={() => toast('You cannot Add member')} className='btn border shadow-none border-radius-none'><i className=' bi bi-plus-lg pe-2'></i>Add Member</button>
                            </div>
                            :
                            <div className=' justify-content-center pt-2 pb-2 w-auto' style={{ border: "1px dashed black" }}>
                                <button onClick={() => setLgShow(true)} className='btn border shadow-none border-radius-none'><i className=' bi bi-plus-lg pe-2'></i>Add Member</button>
                            </div>
                    }

                    <div className='col-12 mt-4'>
                        <div className='col-md-12  rounded border p-1 text-white' style={{ background: '#d04a4a' }}>
                            <i className="bi bi-person-fill "></i> <span>Members Table</span>
                        </div>
                    </div>

                    <div className='col-md-12 mt-4'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">YearLevel</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {member?.map((e, id) => (
                                    <tr key={e._id}>
                                        <td>{e.name}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.address}</td>
                                        <td>{e.contact}</td>
                                        <td>{e.type}</td>
                                        <td>{e.yearlevel}</td>
                                        <td>{e.status}</td>
                                        {
                                            role === 'Super Admin' ?
                                                <td>
                                                    <i type='button' onClick={() => handleDelete(e._id)} className='bi bi-trash me-2'></i>
                                                    <i type='button' onClick={() => handleUpdate(e)} className='bi bi-pencil ms-4'></i>
                                                </td>
                                                :
                                                <td>
                                                    <i type='button' onClick={() => toast('You cannot delete member')} className='bi bi-trash me-2'></i>
                                                    <i type='button' onClick={() => toast('You cannot edit member')} className='bi bi-pencil ms-4'></i>
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

export default Member