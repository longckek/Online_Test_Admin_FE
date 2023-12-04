import { Helmet } from 'react-helmet-async';

import { RoundListView } from 'src/sections/round/view';

// ----------------------------------------------------------------------

export default function RoundListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Round List</title>
      </Helmet>

      <RoundListView />
    </>
  );
}
