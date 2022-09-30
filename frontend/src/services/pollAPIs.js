import axios from "axios";
import { Cookies } from "react-cookie";

const baseURL = "http://127.0.0.1:8000";

export const autheticateUser = () => {
    const cookies = new Cookies();
    return cookies.get("token");
}

export const getAllPollsAPI = () => {
    return axios.get(baseURL + "/polls/");
}

