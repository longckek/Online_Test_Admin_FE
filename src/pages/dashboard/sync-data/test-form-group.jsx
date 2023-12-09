import { Helmet } from 'react-helmet-async';

import { SyncDataTestFormGroupView } from 'src/sections/sync-data/view';

// ----------------------------------------------------------------------

export default function SyncDataTestFormGroupPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sync Data Form Group</title>
      </Helmet>

      <SyncDataTestFormGroupView />
    </>
  );
}
