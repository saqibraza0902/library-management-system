const Books = require('../models/books');


const bookCtrl = {
    getBooks: async (req, res) => {
        try {
            const book = await Books.find()
            return res.send(book)
        } catch (error) {
            return res.status(500).json({ msg: 'error' })
        }
    },
    postBook: async (req, res) => {
        try {
            const { title, category, auther, copies, publication, isbn, year, status, date } = req.body;

            if (!title || !category || !auther || !copies || !publication || !isbn || !year || !status) {
                return res.status(400).json({ message: 'Please filled the field' })
            }
            const bookExist = await Books.findOne({ isbn: isbn })
            if (bookExist) {
                return res.status(400).json({ message: 'Book already exist' })
            }
            const postBook = new Books({ title, category, auther, copies, publication,  isbn, year, status, date })
            await postBook.save();
            const book = await Books.find()
            return res.status(201).json({ message: 'Book Added', book })

        } catch (error) {
            return res.status(500).json({ error: err.message })
        }
    },
    updateBook: async (req, res) => {
        try {
            const { title, category, auther, copies, publication, isbn, year, status, date } = req.body;

            if (!title || !category || !auther || !copies || !publication || !isbn || !year || !status) {
                return res.status(400).json({ message: 'Please filled the field' })
            }
            const update = await Books.findByIdAndUpdate(req.params.id, {
                title, category, auther, copies, publication, isbn, year, status, date
            })
            if (!update) {
                return res.status(400).send({message: "Book do not updated"})
            }
            const book = await Books.find()
            return res.status(201).json({ message: 'Book Updated', book })

        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteBook: async(req, res) => {
        try {
            const id = req.params.id
            const deleteBook = await Books.findByIdAndRemove(id).exec()
            if (!deleteBook) {
                return res.status(400).json({ message: 'Book did not deleted' })
            }
            const book = await Books.find()
            return res.status(200).json({ message: 'Book deleted succesfully', book })
        } catch (error) {
            return res.status(500).json({error:err.message})
        }
    }
}

module.exports = bookCtrl