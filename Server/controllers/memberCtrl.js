const Members = require('../models/member')
const express = require('express');

const memberCtrl = {
    getMember: async (req, res) => {
        try {
            const member = await Members.find()
            return res.send(member)
        } catch (error) {
            return res.status(500).json({ msg: 'error' })
        }
    },
    postMember: async (req, res) => {
        try {
            const { name, gender, address, contact, type, yearlevel, status } = req.body;
            if (!name || !gender || !address || !contact || !type || !yearlevel || !status) {
                return res.status(400).json({ message: 'Please filled the field' })
            }
            const memberExist = await Members.findOne({ contact: contact })

            if (memberExist) {
                return res.status(400).json({ message: 'Member already exist' })
            }
            const postMember = new Members({ name, gender, address, contact, type, yearlevel, status })
            await postMember.save();
            const member = await Members.find()
            return res.status(201).json({ message: 'Member Registered', member })
        } catch (error) {
            return res.status(500).json({ error: err.message })
        }
    },
    updateMember: async (req, res) => {
        try {
            const { name, gender, address, contact, type, yearlevel, status } = req.body;
            if (!name || !gender || !address || !contact || !type || !yearlevel || !status) {
                return res.status(400).json({ message: 'Please filled the field' })
            }
            const update = await Members.findByIdAndUpdate(req.params.id, {
                name, gender, address, contact, type, yearlevel, status 
            })
            if (!update) {
                return res.status(400).send({message: "Do not updated"})
            }
            const member = await Members.find()
            return res.status(201).json({ message: 'Member Updated', member })
        } catch (error) {
            return res.status(500).json({ error: err.message })
        }

    },
    deleteMember: async(req, res) => {
        try {
            const id = req.params.id
            const deleteMember = Members.findByIdAndRemove(id).exec()
            if (!deleteMember) {
                return res.status(400).json({message: 'Member do not deleted'})
            }
            const member = await Members.find()
            return res.status(201).json({ message: 'Member Deleted', member})
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = memberCtrl