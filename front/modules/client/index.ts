import Axios from 'axios';

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 */

export const axiosSetting = {
  scheme: 'http',
  host: 'localhost',
  api: '',
  port: '3065',
  server() {
    return `${this.scheme ? `${this.scheme}:` : ''}//${this.host}${this.api}${this.port ? `:${this.port}` : ''}`;
  },
};

export const axios = Axios.create({
  baseURL: axiosSetting.server(),
  withCredentials: true,
});
