import { Helmet } from 'react-helmet-async';

import { SyncDataRoundView } from 'src/sections/sync-data/view';

// ----------------------------------------------------------------------

export default function SyncDataRoundPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sync Data Round</title>
      </Helmet>

      <SyncDataRoundView />
    </>
  );
}
