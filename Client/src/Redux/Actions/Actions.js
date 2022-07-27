export const borrow = (borrow) => {
    return {
        type: "BORROW",
        payload: borrow
    }
}
export const booksAction = (books) => {
    return {
        type: 'BOOKS',
        payload: books
    }
}
export const bookCategory = (category) => {
    return {
        type: 'CATEGORY',
        payload: category
    }
}
// export const userAction = (user) => {
//     return {
//         type: "USER",
//         payload: user
//     }
// }