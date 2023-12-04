import { Helmet } from 'react-helmet-async';

import { ActivationCodeCreateView } from 'src/sections/activation-code/view';

// ----------------------------------------------------------------------

export default function ActivationCodeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a activation code</title>
      </Helmet>

      <ActivationCodeCreateView />
    </>
  );
}
