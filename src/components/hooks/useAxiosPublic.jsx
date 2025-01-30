import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://backend.toyhouseglobal.com:8080",
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;