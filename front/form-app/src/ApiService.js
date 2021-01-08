import axios from 'axios';

const BASE_URL = "http://localhost:8080";

class ApiService{
    fetchForms(){
        return axios.get(`${BASE_URL}/forms`);
    }
}

export default new ApiService();