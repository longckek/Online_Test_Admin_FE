import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RoundDetailsView } from 'src/sections/round/view';

// ----------------------------------------------------------------------

export default function RoundDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Round Details</title>
      </Helmet>

      <RoundDetailsView id={`${id}`} />
    </>
  );
}
