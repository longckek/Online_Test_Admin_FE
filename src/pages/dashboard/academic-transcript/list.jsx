import { Helmet } from 'react-helmet-async';

import { AcademicTranscriptListView } from 'src/sections/academic-transcript/view';

// ----------------------------------------------------------------------

export default function AcademicTranscriptListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Academic Transcript List</title>
      </Helmet>

      <AcademicTranscriptListView />
    </>
  );
}
