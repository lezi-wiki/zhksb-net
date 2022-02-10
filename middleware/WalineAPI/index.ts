import axios from "axios";

export const baseURL = "https://comment.zhksb.net";

export const getBaseURL = () => {
    return baseURL + "/";
};

const instance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
});

export default instance;
