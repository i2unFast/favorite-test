import axiosInstance from "../libs/axios";
import type { AxiosRequestHeaders } from "axios";

export function getUsers(headers?: AxiosRequestHeaders) {
  const url = `/users`;
  return axiosInstance({ url, headers });
}

export function getUserById(id: string, headers?: AxiosRequestHeaders) {
  const url = `/user/${id}`;
  return axiosInstance({ url, headers });
}

export function createUser(headers?: AxiosRequestHeaders, data?: object) {
  const url = `/user`;
  return axiosInstance({ url, headers, data, method: "POST" });
}

export function updateUser(
  id: string,
  headers?: AxiosRequestHeaders,
  data?: object
) {
  const url = `/user/${id}`;
  return axiosInstance({ url, headers, data, method: "PUT" });
}

export function deleteUser(id: string, headers?: AxiosRequestHeaders) {
  const url = `/user/${id}`;
  return axiosInstance({ url, headers, method: "DELETE" });
}

export function patchUser(
  id: string,
  headers?: AxiosRequestHeaders,
  data?: object
) {
  const url = `/user/${id}`;
  return axiosInstance({ url, headers, data, method: "PATCH" });
}
