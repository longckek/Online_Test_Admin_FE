import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ActivationCodeDetailsView } from 'src/sections/activation-code/view';

// ----------------------------------------------------------------------

export default function CourseDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Activation Code Details</title>
      </Helmet>

      <ActivationCodeDetailsView id={`${id}`} />
    </>
  );
}
