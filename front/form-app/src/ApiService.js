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

  contentReply(contentIdx, result) {
    return axios.post(`${BASE_URL}/contents/${contentIdx}`, result);
  }

  contentForm(result){
    return axios.post(`${BASE_URL}/forms`, result);
  }
}

export default new ApiService();
