import React from 'react'
import Header from './Header'
import banner from './images/library-banner.jpg';

const Home = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('default', { month: 'long' });
    var yyyy = today.getFullYear();
    const day = today.toLocaleString('en-Us', { weekday: 'long' });
    today = month + ' ' + dd + ' , ' + yyyy;


    return (
        <div>
            <div className='header'>
                <Header />
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-5'>
                        <img className='w-100 rounded' style={{ height: '300px' }} src={banner} alt='' />
                    </div>
                    <div className='col-md-12  mt-3 rounded d-md-flex pt-2 justify-content-between' style={{ background: '#cff4fc' }}>
                        <span>Head's Up!!  Welcome to E.B. Magalona Library</span>
                        <p ><i className="bi bi-calendar2-date"></i><span className='me-2 ms-1'>{day}</span><span> {today}</span></p>
                    </div>
                    <div className='d-sm-flex d-block mt-3 rounded p-2 '>
                        <div className='col-md-3'>
                            <div className='d-flex'>
                                <span className='border ps-4 pe-4 pt-2 pb-2'><i className="bi bi-telephone me-1"></i>Contact Us</span>
                            </div>

                            <div className='mt-2'>
                                <strong>Address:</strong>
                                <p>National Highway, Brgy. 2 Poblacion E.B. Magalona., Negros Occidental</p>
                            </div>
                            <div className='mt-2'>
                                <strong>Phone No.</strong>
                                <p>0335-7275136</p>
                            </div>
                            <div className='mt-2 '>
                                <strong>Email:</strong>
                                <p className='w-25'>Admin@gmail.com</p>
                            </div>
                        </div>
                        <div className='col-md-9 '>
                            <img className='w-100' src={banner} alt='' />

                        </div>
                    </div>
                    <div className='d-block d-sm-flex mt-5 mb-5 ' >
                        <div className='rounded p-5 text-white' style={{ background: '#008000' }}>
                            <strong>Vision</strong>
                            <hr></hr>
                            <div className='ms-5'>
                                By 2016. E.B.Magalona National High School is a center of learning were stackholders are conscientiously involved in loning holistic individuals committed to positively respond to the needs of the school, community and the country.
                            </div>
                            <hr></hr>
                            <strong>Mission</strong>
                            <hr></hr>
                            <div className='ms-5'>
                                To nurture students to become productive responsible citizens through the assistance of service - oriented and highly competent internal and external stakeholders working in a harmonious relationship.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='p-4 bg-dark'>
                <p className='text-white text-center m-0'>2013 E.B. Magalona National High School. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Home