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
  student: {
    list: '/admin/student/list',
    details: '/admin/student/details',
  },
  history: {
    student: '/admin/history/list/student',
  },
  syncData: {
    testOutline: '/nguon-1/load/test-outline',
    testTakerGroup: '/nguon-1/load/test-taker-group',
    testFormGroup: '/nguon-1/load/test-form-group',
  },
};
