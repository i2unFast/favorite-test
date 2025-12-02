import axiosInstance from "../libs/axios";
import type { AxiosRequestHeaders } from "axios";

export function createFavorite(headers?: AxiosRequestHeaders, data?: object) {
  const url = `/favorites`;
  return axiosInstance({ url, headers, data, method: "POST" });
}

export function deleteFavorite(id: string, headers?: AxiosRequestHeaders) {
  const url = `/favorites/${id}`;
  return axiosInstance({ url, headers, method: "DELETE" });
}
