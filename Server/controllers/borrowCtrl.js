const Borrows = require('../models/borrow')
const Books = require('../models/books')

const borrowCtrl = {
    getBorrow: async (req, res) => {
        try {
            const borrow = await Borrows.find().populate('user').populate('book')
            res.json(borrow)
        } catch (error) {
            return res.status(500).json({ msg: 'error' })
        }
    },
    postBorrow: async (req, res) => {
        try {
            const { book, user, borrowDate, dueDate } = req.body
            if (!book || !user || !borrowDate || !borrowDate || !dueDate) {
                return res.status(400).json({ message: 'Please fill all fields' })
            }
            const newBorrow = new Borrows({
                book, user, borrowDate, dueDate
            })
            await Books.findByIdAndUpdate({ _id: book }, { $inc: { copies: -1 } })
            await newBorrow.save()

            return res.status(201).json({ message: 'Borrowed Successfully' })
        } catch (error) {
            return res.status(500).json({ error: err.message })
        }
    },
    updateBorrow: async (req, res) => {
        const { returnDate, bookId } = req.body
        try {
            const id = req.params.id
            await Borrows.findByIdAndUpdate({ _id: id }, { status: 'Returned', returnDate: returnDate })
            await Books.findByIdAndUpdate({ _id: bookId }, { $inc: { copies: 1 } })
            const borrow = await Borrows.find().populate('user').populate('book')
            return res.status(201).json({ message: 'Returned Successfully', borrow })
        } catch (error) {
            return res.status(500).json({ error: err.message })
        }
    }
}
module.exports = borrowCtrl