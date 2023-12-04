import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CourseDetailsView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export default function CourseDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Course Details</title>
      </Helmet>

      <CourseDetailsView id={`${id}`} />
    </>
  );
}
