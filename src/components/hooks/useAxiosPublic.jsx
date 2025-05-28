import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://backend.toyhouseglobal.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
