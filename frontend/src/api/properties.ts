import axiosInstance from "../libs/axios";
import type { AxiosRequestHeaders } from "axios";

export function getProperties(headers?: AxiosRequestHeaders) {
  const url = `/properties`;
  return axiosInstance({ url, headers });
}

export function getPropertyById(id: string, headers?: AxiosRequestHeaders) {
  const url = `/properties/${id}`;
  return axiosInstance({ url, headers });
}

export function createProperty(headers?: AxiosRequestHeaders, data?: object) {
  const url = `/properties`;
  return axiosInstance({ url, headers, data, method: "POST" });
}

export function updateProperty(
  id: string,
  headers?: AxiosRequestHeaders,
  data?: object
) {
  const url = `/properties/${id}`;
  return axiosInstance({ url, headers, data, method: "PUT" });
}

export function deleteProperty(id: string, headers?: AxiosRequestHeaders) {
  const url = `/properties/${id}`;
  return axiosInstance({ url, headers, method: "DELETE" });
}

export function patchProperty(
  id: string,
  headers?: AxiosRequestHeaders,
  data?: object
) {
  const url = `/properties/${id}`;
  return axiosInstance({ url, headers, data, method: "PATCH" });
}
