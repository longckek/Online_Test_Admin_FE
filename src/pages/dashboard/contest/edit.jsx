import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ContestEditView } from 'src/sections/contest/view';

// ----------------------------------------------------------------------

export default function ContestEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Contest Edit</title>
      </Helmet>

      <ContestEditView id={`${id}`} />
    </>
  );
}
