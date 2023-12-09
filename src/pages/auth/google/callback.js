// ----------------------------------------------------------------------

import { useLocation } from "react-router";
import { paths } from 'src/routes/paths';

export default function CallbackPage() {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const accessToken = urlParams.get('accessToken');
  const refreshToken = urlParams.get('refreshToken');
  if(accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    window.location.href = paths.dashboard.course.root;
  } else {
    window.location.href = paths.auth.google.signIn;
  }
  return null;
}
