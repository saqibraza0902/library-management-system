import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#751816' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Logo</a>
                    <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/"><i className="bi bi-house-fill fs-5 me-1"></i>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/about"><i className="bi bi-info-circle-fill fs-5 me-1"></i>About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/admin" ><i className="bi bi-person-fill fs-5 me-1"></i>Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header