import axiosInstance from './axiosInstance';

const Request = {
  Post: async ({ url, data }) => {
    const response = await axiosInstance.post(url, data);
    return response;
  },
};

export default Request;
