const initialState = {
    borrows:[]
}
const BorrowReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'BORROW':
            return {
                borrows: action.payload
            }
        default:
            return {
                state
            }
    }
    
}

export default BorrowReducer