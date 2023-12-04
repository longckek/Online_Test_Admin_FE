import { Helmet } from 'react-helmet-async';

import { CourseCreateView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export default function CourseCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <CourseCreateView />
    </>
  );
}
