import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CourseEditView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export default function CourseEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <CourseEditView id={`${id}`} />
    </>
  );
}
