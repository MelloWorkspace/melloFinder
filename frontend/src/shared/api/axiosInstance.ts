import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "/",
	withCredentials: true,
});

export type { AxiosInstance } from "axios";
