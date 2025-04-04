// services/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define base URL for API calls
const API_URL = "https://playsync-api.onrender.com";
// const API_URL = "http://localhost:4000";

// Axios instance configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Wrapper function for GET request
export const get = async <T>(
  url: string,
  authToken: string | null = null, // Added authToken parameter
  config?: AxiosRequestConfig,
  queryParams?: Record<string, any> // Add queryParams as an optional parameter
): Promise<T> => {
  try {
    const headers = authToken
      ? { ...config?.headers, Authorization: `Bearer ${authToken}` }
      : config?.headers;

    const response: AxiosResponse<T> = await axiosInstance.get(url, {
      ...config,
      headers,
      params: queryParams, // Pass queryParams as the 'params' in the Axios request
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow error to propagate to the calling function
  }
};

// Wrapper function for POST request
export const post = async <T>(
  url: string,
  data: object,
  authToken: string | null = null, // Added authToken parameter
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const headers = authToken
      ? { ...config?.headers, Authorization: `Bearer ${authToken}` } // Add bearer token if provided
      : config?.headers;

    const response: AxiosResponse<T> = await axiosInstance.post(url, data, {
      ...config,
      headers,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow error to propagate to the calling function
  }
};

// Wrapper function for PATCH request
export const patch = async <T>(
  url: string,
  data: object,
  authToken: string | null = null, // Added authToken parameter
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const headers = authToken
      ? { ...config?.headers, Authorization: `Bearer ${authToken}` }
      : config?.headers;

    const response: AxiosResponse<T> = await axiosInstance.patch(url, data, {
      ...config,
      headers,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow error to propagate to the calling function
  }
};

// Wrapper function for DELETE request
export const del = async <T>(
  url: string,
  authToken: string | null = null, // Added authToken parameter
  body?: object, // Added body parameter
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const headers = authToken
      ? { ...config?.headers, Authorization: `Bearer ${authToken}` }
      : config?.headers;

    const response: AxiosResponse<T> = await axiosInstance.delete(url, {
      ...config,
      headers,
      data: body,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow error to propagate to the calling function
  }
};

// Error handling function
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
  } else {
    console.error("Unexpected Error:", error);
  }
};
