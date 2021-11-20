import { axios } from '@modules/client';

export async function getDataFetcher(url: string) {
  return axios.get(url).then((response) => response.data.resData);
}

export async function getFullDataFetcher(url: string) {
  return axios.get(url).then((response) => response.data);
}

export async function getItemDataFetcher(url: string) {
  return axios.get(url).then((response) => response.data.resData.item);
}

export async function getListDataFetcher(url: string) {
  return axios.get(url).then((response) => response.data.resData.list);
}
