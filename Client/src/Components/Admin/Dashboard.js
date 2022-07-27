import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './Nav';
import '../../index.css'
import bookimg from '../images/books-shelf.jpg'

const Dashboard = () => {
    

    return (
        <div>
            <Nav />
            {/* <h4 className='d-flex justify-content-center'>Welcome {user?.firstname + user?.lastname}</h4> */}
            <img className='img-fluid' src={bookimg}  />
           
        </div>
    )
}

export default Dashboard