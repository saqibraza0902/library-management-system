const User = require('../models/user')
const express = require('express');

const userCtrl = {
    getUser: async (req, res) => {
        try {
            const user = await User.find()
            return res.send(user)
        } catch (error) {
            return res.status(500).json({ msg: 'error' })
        }
    },
    postUser: async (req, res) => {
        try {
            const { firstname, lastname, email, phone, password, role } = req.body;
            if (!firstname || !lastname || !email || !phone || !role || !password) {
                return res.status(400).json({ message: 'Please filled the field' })
            }

            const userExist = await User.findOne({ email: email })
            if (userExist) {
                return res.status(400).json({ message: 'User already exist' })
            }
            const postUser = new User({ firstname, lastname, email, phone, role, password })
            await postUser.save();
            const user = await User.find()
            res.status(201).json({ message: 'User Registered', user })
        } catch (error) {
            return res.status(500).json({ error: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { firstname, lastname, email, phone, password, role } = req.body;
            if (!firstname || !lastname || !email || !phone || !role || !password) {
                return res.status(400).json({ message: "Please fill all the fields" })
            }
            
            const update = await User.findByIdAndUpdate(req.params.id, { firstname, lastname, email, phone, role, password })
            if (!update) {
                return res.status(404).send({message: "Do not updated User"})
            }
            const user = await User.find()
            return res.status(200).json({ message: 'User Updated successfully', user })

        } catch (error) {
            return res.status(500).json({ error: err.message })
        }

    },
    deleteUser: async(req, res) => {
       try {
           const id = req.params.id
           const deleteUser =await User.findByIdAndRemove(id).exec()
           if (!deleteUser) {
               return res.status(400).json({message: 'User did not deleted'})
           }
           const user = await User.find()
           return res.status(200).json({message: 'User deleted succesfull', user})
       } catch (error) {
        return res.status(500).json({error: err.message})
       }
    }
}

module.exports = userCtrl