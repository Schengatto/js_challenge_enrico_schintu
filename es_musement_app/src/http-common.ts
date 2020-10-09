import axios, {AxiosInstance} from "axios";

export const BASE_API_URL = "https://api.musement.com/api/v3";

export const API_SUFFIX = "/venues/164/activities";

export class HttpCommon {
  public static getApi(headers: {}): AxiosInstance {
    return axios.create({
      baseURL: BASE_API_URL,
      headers: headers ? headers : {"Content-type": "application/json"}
    });
  }
}
