import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AcademicTranscriptEditView } from 'src/sections/academic-transcript/view';

// ----------------------------------------------------------------------

export default function AcademicTranscriptEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Academic Transcript Edit</title>
      </Helmet>

      <AcademicTranscriptEditView id={`${id}`} />
    </>
  );
}
