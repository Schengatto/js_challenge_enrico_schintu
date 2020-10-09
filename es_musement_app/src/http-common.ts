import axios, { AxiosInstance } from "axios";

export const BASE_API_URL = "https://api.musement.com/api/v3";

export class HttpCommon {
  public static getApi(): AxiosInstance {
    return axios.create({
      baseURL: BASE_API_URL,
      headers: { "Content-type": "application/json" }
    });
  }
}
