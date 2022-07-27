import React from 'react'
import Header from './Header'
import banner from './images/library-banner.jpg';

const About = () => {

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
                    <div className='d-block d-sm-flex mt-5 mb-5 ' >
                        <div className='rounded col-12 p-3 text-white' style={{ background: '#808080' }}>
                            <div className='col-md-12  rounded pt-2 ps-2 pe-2 border d-md-flex justify-content-between' style={{ background: '#d04a4a' }}>
                                <span>Head's Up!!  Welcome to E.B. Magalona Library</span>
                                <p ><i className="bi bi-calendar2-date"></i><span className='me-2 ms-1'>{day}</span><span> {today}</span></p>
                            </div>
                            <div>
                                <h3 className='text-center pt-3 text-uppercase'>Library Hours</h3>
                            </div>
                            <div className='col-12'>
                                <div className='d-flex justify-content-between'>
                                    <p>Monday to Thursday</p>
                                    <p>08:00 a.m. to 07:00 p.m</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p>Wednesday to Friday</p>
                                    <p>08:00 a.m. to 06:30 p.m</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Library Staff</p>
                                <p>Ms.Purano (Librarian)</p>
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

export default About