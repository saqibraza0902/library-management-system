import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Nav = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        window.location.href = '/admin'
    };
    const getUser = useSelector((state) => state.login.loggedInUser)
    const role = getUser?.role
    // console.log(role)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#751816' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Logo</a>
                    <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/admin/dashboard"><i className="bi bi-house-fill fs-5 me-1"></i>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/admin/user"><i className="bi bi-person-fill fs-5 me-1"></i>Users</Link>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link dropdown text-white" type='button'><i className="bi bi-file-earmark-fill fs-5 me-1"></i>
                                    <span id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Transitions
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li className="d-flex justify-content-between"><Link className="dropdown-item" to="/admin/borrow"><i className='bi bi-pencil me-2'></i>Borrow</Link></li>
                                        <li><Link className="dropdown-item" to="/admin/view_borrow"><i className='bi bi-gear-fill me-2'></i>View Returned Books</Link></li>
                                        {/* <li><Link className="dropdown-item" to="/"><i className='bi bi-list fs-5 me-2'></i>View Borrowed Books</Link></li> */}
                                    </ul>
                                </div>
                            </li>
                            {
                                role === 'Super Admin' ?
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/admin/books" ><i className="bi bi-book-fill fs-5 me-1"></i>Books</Link>
                                    </li>
                                    :
                                    <li className="nav-item" onClick={()=>toast('You are restricted')}>
                                        <span type='button' className="nav-link active"><i className="bi bi-book-fill fs-5 me-1"></i>Books</span>
                                    </li>
                            }

                            <li className="nav-item">
                                <Link className="nav-link active" to="/admin/members" ><i className="bi bi-people-fill fs-5 me-1"></i>Members</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link active" type='button' onClick={handleLogout} ><i className="bi bi-box-arrow-right fs-5 me-1"></i>Logout</span>
                            </li>
                        </ul>
                        <ul className='navbar-nav  mb-2 mb-lg-0 d-lg-flex d-none'>
                            <li className="nav-item">
                                <span className="nav-link active" >Welcome: {getUser?.firstname}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
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

export default Nav