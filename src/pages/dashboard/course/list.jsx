import { Helmet } from 'react-helmet-async';

import { CourseListView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export default function CourseListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <CourseListView />
    </>
  );
}
