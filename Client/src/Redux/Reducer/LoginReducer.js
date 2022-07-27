const initialState = {
    loggedInUser: '',
    token:''
}
const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return {
                loggedInUser: JSON.parse(localStorage.getItem('user')),
                token: localStorage.getItem('token')
            }
    }

}

export default LoginReducer