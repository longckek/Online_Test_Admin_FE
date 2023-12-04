import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RoundEditView } from 'src/sections/round/view';

// ----------------------------------------------------------------------

export default function RoundEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Round Edit</title>
      </Helmet>

      <RoundEditView id={`${id}`} />
    </>
  );
}
