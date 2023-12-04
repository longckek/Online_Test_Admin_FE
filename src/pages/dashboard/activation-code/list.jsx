import { Helmet } from 'react-helmet-async';

import { ActivationCodeListView } from 'src/sections/activation-code/view';

// ----------------------------------------------------------------------

export default function ActivationCodeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Activation Code List</title>
      </Helmet>

      <ActivationCodeListView />
    </>
  );
}
