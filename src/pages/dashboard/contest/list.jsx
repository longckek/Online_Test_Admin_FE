import { Helmet } from 'react-helmet-async';

import { ContestListView } from 'src/sections/contest/view';

// ----------------------------------------------------------------------

export default function ContestListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Contest List</title>
      </Helmet>

      <ContestListView />
    </>
  );
}
