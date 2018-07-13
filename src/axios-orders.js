import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-7aa81.firebaseio.com/'
});
export default instance;