import axiosInstance from "../api.interceptor/axiosInstance";

const route = "/athlete-hub" 

export const athleteHubApis = {
    getAllBlogs : () => axiosInstance.get(`${route}/all/blogs`),
};