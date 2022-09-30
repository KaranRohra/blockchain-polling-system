import axios from "axios";
import { Cookies } from "react-cookie";

const baseURL = "http://127.0.0.1:8000";

export const autheticateUser = () => {
    const cookies = new Cookies();
    return cookies.get("token");
};

export const getAllPollsAPI = () => {
    return axios.get(baseURL + "/polls/");
};

export const getPollAPI = (pollId, userId) => {
    return axios.get(`${baseURL}/polls/${pollId}/?user_id=${userId}`);
};

export const givePollAPI = (userId, pollId, pollOptionId) => {
    return axios.post(`${baseURL}/give-poll/`, {
        poll_id: Number(pollId),
        user_id: userId,
        poll_option_id: Number(pollOptionId),
    });
};
