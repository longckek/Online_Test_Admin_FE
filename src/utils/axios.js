import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/admin/get-me',
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
  },
  course: {
    list: '/admin/course/list',
    details: '/admin/course/details',
    root: '/admin/course',
    modify: '/admin/course/mock-contest/modify'
  },
  contest: {
    list: '/admin/mock-contest/list',
    details: '/admin/mock-contest/details',
    root: '/admin/mock-contest',
    modify: '/admin/mock-contest/round/modify'
  },
  round: {
    list: '/admin/round/list',
    details: '/admin/round/details',
    root: '/admin/round',
  },
  activationCode: {
    list: '/admin/activation-code/list',
    details: '/admin/activation-code/details',
    create: '/admin/activation-code/generate',
    root: '/admin/activation-code',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
