import { Helmet } from 'react-helmet-async';

import { GoogleLoginView } from 'src/sections/auth/google';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> SignIn </title>
      </Helmet>

      <GoogleLoginView />
    </>
  );
}
