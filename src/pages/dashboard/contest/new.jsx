import { Helmet } from 'react-helmet-async';

import { ContestCreateView } from 'src/sections/contest/view';

// ----------------------------------------------------------------------

export default function ContestCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new contest</title>
      </Helmet>

      <ContestCreateView />
    </>
  );
}
