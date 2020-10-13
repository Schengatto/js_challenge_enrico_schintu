import axios, { AxiosInstance, AxiosResponse } from "axios";
import ApiRequestDataMode from "@/models/api-request-data.mode";

export const BASE_API_URL = "https://api.musement.com/api/v3";

export const API_SUFFIX = "/venues/164/activities";

export class HttpCommon {
  /**
   * Returns the Axios instance with headers already configured.
   */
  public static getApi(language?: string, currency?: string): AxiosInstance {
    const headers = {
      "accept-language": language || localStorage.getItem("language") || "en",
      "content-type": "application/json",
      "x-musement-currency": currency || localStorage.getItem("currency") || "EUR",
      "x-musement-version": "3.4.0"
    };
    return axios.create({
      baseURL: BASE_API_URL,
      headers: { ...headers }
    });
  }

  /**
   * Contact the API to obtain an event list.
   * @param requestData
   */
  public static getEventItems(requestData: ApiRequestDataMode): Promise<AxiosResponse> {
    const { limit, offset, language, currency, callback } = requestData;
    let result = HttpCommon.getApi(language, currency).get(API_SUFFIX, {
      params: { limit, offset }
    });
    if (callback) {
      result = result.then(response => callback.apply(this, [response.data]));
    }
    return result;
  }
}
