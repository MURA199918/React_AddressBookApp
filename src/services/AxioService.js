import axios from 'axios';
import { baseUrl } from '../config/config';

export default class AxiosServices {
    
    Post(url, data) {
        console.log(data,baseUrl)
        return axios.post(baseUrl+url, data, {
            headers: {
                contentType: 'application/json'
            }
        })
    }

    Get(url) {
        return axios.get(baseUrl + url, {
            headers: {
                contentType: 'application/json'
            }
        })
    }

    Delete(url) {
        return axios.delete(baseUrl+url, {
            headers: {
                contentType: 'application/json'
            }
        })
    }

    Put(url, data) {
        return axios.put(baseUrl+url, data, {
            headers: {
                contentType: 'application/json'
            }
        })
    }
}