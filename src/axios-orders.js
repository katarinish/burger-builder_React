import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-93f0d.firebaseio.com/',
});

export default instance;