import axios from 'axios'

const axiosApi = axios.create({
    baseURL:"https://library-management-system-mern.herokuapp.com"
})

export default axiosApi