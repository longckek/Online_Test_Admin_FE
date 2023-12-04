import { Helmet } from 'react-helmet-async';

import { RoundCreateView } from 'src/sections/round/view';

// ----------------------------------------------------------------------

export default function RoundCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new round</title>
      </Helmet>

      <RoundCreateView />
    </>
  );
}
