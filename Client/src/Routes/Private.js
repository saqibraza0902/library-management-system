import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const Private = () => {
    const token = useSelector((state)=>state.login.token)
    const setAuth = () => {
        // console.log(token)
        if (token) {
            return true
        } else {
            return false
        }
    }
    const auth = setAuth()
    return (
        <div>{auth === true ? <Outlet /> : <Navigate to='/' />}</div>
    )
}

export default Private