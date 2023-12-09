import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AcademicTranscriptDetailsView } from 'src/sections/academic-transcript/view';

// ----------------------------------------------------------------------

export default function AcademicTranscriptDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Academic Transcript Details</title>
      </Helmet>

      <AcademicTranscriptDetailsView id={`${id}`} />
    </>
  );
}
