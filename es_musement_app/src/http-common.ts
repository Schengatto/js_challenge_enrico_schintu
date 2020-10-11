import axios, {AxiosInstance, AxiosResponse} from "axios";
import userStore from "@/store/user/user-store";

export const BASE_API_URL = "https://api.musement.com/api/v3";

export const API_SUFFIX = "/venues/164/activities";

export class HttpCommon {

  /**
   * Returns the Axios instance with headers already configured.
   */
  public static getApi(): AxiosInstance {
    const headers = {
      'accept-language': userStore.language,
      'content-type': 'application/json',
      'x-musement-currency': userStore.currency,
      'x-musement-version': '3.4.0'
    };
    return axios.create({
      baseURL: BASE_API_URL,
      headers: {...headers}
    });
  }

  /**
   * Contact the API to obtain an event list.
   * @param limit
   * @param offset
   */
  public static getEventItems(limit: number, offset: number): Promise<AxiosResponse> {
    return HttpCommon.getApi()
      .get(API_SUFFIX, {params: {limit, offset}});
  }
}
