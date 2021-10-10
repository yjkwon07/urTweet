import Axios from 'axios';

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 */

export const axiosSetting = {
<<<<<<< Updated upstream
  scheme: 'http',
  host: 'localhost',
  api: '',
  port: '3065',
=======
  scheme: process.env.NEXT_PUBLIC_SCHEME,
  host: process.env.NEXT_PUBLIC_HOST,
  api: process.env.NEXT_PUBLIC_API,
  port: process.env.NEXT_PUBLIC_PORT,
>>>>>>> Stashed changes
  server() {
    return `${this.scheme}://${this.host}${this.api}${this.port ? `:${this.port}` : ''}`;
  },
};

export const axios = Axios.create({
  baseURL: axiosSetting.server(),
  withCredentials: true,
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`error`, error);

    if (!error?.response?.data) {
      // eslint-disable-next-line no-param-reassign
      error.response = { data: { resMsg: '네트워크 오류' } };
    }
    return Promise.reject(error);
  },
);
