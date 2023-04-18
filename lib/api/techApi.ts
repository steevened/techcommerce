import axios from 'axios';
import Router from 'next/router';
import Cookie from 'js-cookie';

export const techApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TECH_API_URL,
});

techApi.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response === 401) {
      Router.push('/');
    }
    return Promise.reject(error);
  }
);

async function getTokenFromCookie() {
  return Cookie.get('token');
}
