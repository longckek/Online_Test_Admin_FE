import { Helmet } from 'react-helmet-async';

import { SyncDataTestOutlineView } from 'src/sections/sync-data/view';

// ----------------------------------------------------------------------

export default function SyncDataTestOutlinePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sync Data Test Outline</title>
      </Helmet>

      <SyncDataTestOutlineView />
    </>
  );
}
