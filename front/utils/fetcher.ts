import { axios } from '@modules/client';

export async function getDataFetcher(url: string) {
  return axios.get(url).then((response) => response.data.resData);
}

export async function getFullDataFetcher<T>(url: string, data?: T) {
  return axios.get(url, data).then((response) => response.data);
}

export async function getItemDataFetcher<T>(url: string, data?: T) {
  return axios.get(url, data).then((response) => response.data.resData.item);
}

export async function getListDataFetcher<T>(url: string, data?: T) {
  return axios.get(url, data).then((response) => response.data.resData.list);
}
