import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Header from './Header'
import Modal from 'react-bootstrap/Modal';
import axiosApi from '../axios/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
// import { userAction } from '../Redux/Actions/Actions';

const Admin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [lgShow, setLgShow] = useState(false);
    const [user, setUser] = useState(null)
    const [code, setCode] = useState()
    const navigate = useNavigate()
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await axiosApi.post('/user/login', {
            email, password
        })
        console.log(data)
        if (data.status === 'Ok') {
            setLgShow(true)
            setUser(data.user_id)

        } else {
            alert('Please check your email and password')
        }
        console.log(data)
    }
    const sendOTP = async (e) => {
        e.preventDefault();
        const {data} = await axiosApi.post('/user/verify-otp', {
                user,
                code
        })
        // const data = await response.json()
        console.log(data.detail.user)
        if (data.token) {
            swal("Success", "success", {
                buttons: false,
                timer: 3000,
            }).then(() => {
                localStorage.setItem('user', JSON.stringify(data.detail.user))
                // dispatch(userAction(data.detail.user))
                localStorage.setItem('token', data.token)
                window.location.href = '/admin/dashboard'
            })
            setLgShow(false)
            setCode()
            
        } else {
            alert(data.msg)
        }
    }
    const logUser = useSelector((state) => state.login.loggedInUser)
    useEffect(() => {
        
        if (logUser) {
            toast('You are already Login')
            navigate('/admin/dashboard')
        }
    },[logUser])
    
    return (
        <div>
            <Header />
            <Modal show={lgShow} onHide={() => setLgShow(false)} centered aria-labelledby="example-modal-sizes-title-lg">
                <form onSubmit={sendOTP}>

                    <Modal.Body scrollable='true'>
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div>
                                        <label className='col-3 mb-3'>Enter Your OTP</label>
                                        <input type='text' value={code} onChange={(e) => setCode(e.target.value)} className="form-control shadow-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='submit' className='btn btn-primary shadow-none'>Submit</button>
                        <button className='btn btn-secondary shadow-none' onClick={() => setLgShow(false)}>Cancel</button>
                    </Modal.Footer>
                </form>
            </Modal>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='container'>
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center mt-4 '>
                            <div className='col-md-5 text-center text-white p-2 rounded' style={{ background: '#a52a2a' }}>
                                Please Enter the details below
                            </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center' >
                            <div className='col-md-5 text-white pt-5 rounded' style={{ background: '#5f9ea0' }}>
                                <div className='d-flex p-1 justify-content-between'>
                                    <label className='col-3'>Email</label>
                                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control shadow-none" />
                                </div>
                                <div className='d-flex pt-3 p-1 justify-content-between'>
                                    <label className='col-3'>Password</label>
                                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control shadow-none" />
                                </div>
                                <div className='d-grid p-1 pt-3'>
                                    <button type='submit' className='btn btn-primary'>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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

export default Admin