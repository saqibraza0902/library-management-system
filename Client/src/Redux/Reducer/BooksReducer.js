const initialState = {
    books: [],
    booksCategory: []
}
const BooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOKS':
            return {
                books: action.payload
            }
        default:
            return {
                state
            }
    }

}

export default BooksReducer