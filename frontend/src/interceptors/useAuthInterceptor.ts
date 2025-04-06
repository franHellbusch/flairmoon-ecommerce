import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";

export const authRequestInterceptor = (): void => {
  const updateHeaders = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const newHeaders = new AxiosHeaders({
      "Content-Type": "application/json",
      credentials: "include",
    });

    request.headers = newHeaders;
    request.withCredentials = true;
    return request;
  };

  axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    return updateHeaders(request);
  });

  // handles response errors by extracting the error data from the response.
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error?.response?.data || error);
    }
  );
};
