import { combineReducers } from 'redux';
import BorrowReducer from './BorrowReducer';
import BooksReducer from './BooksReducer';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
    borrow: BorrowReducer,
    books: BooksReducer,
    login: LoginReducer

});

export default rootReducer;