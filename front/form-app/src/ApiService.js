import axios from "axios";

const BASE_URL = "http://localhost:8080";

class ApiService {
  formList() {
    return axios.get(`${BASE_URL}/forms`);
  }

  login(user) {
    return axios.post(`${BASE_URL}/user/login`, user);
  }

  formInfo(formIdx) {
    return axios.get(`${BASE_URL}/forms/${formIdx}`);
  }

  formReply(formIdx, result){
    return axios.post(`${BASE_URL}/forms/${formIdx}`, result);
  }

  contentForm(result) {
    return axios.post(`${BASE_URL}/forms`, result);
  }

  deleteForm(formIdx) {
    return axios.delete(`${BASE_URL}/forms/${formIdx}`);
  }
    
  signup(user) {
    return axios.post(`${BASE_URL}/user/signup`, user);
  }

}

export default new ApiService();
