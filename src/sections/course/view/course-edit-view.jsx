import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { useGetCourse } from 'src/api/course'

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CourseNewEditForm from '../course-new-edit-form';

// ----------------------------------------------------------------------

export default function CourseEditView({ id }) {
  const settings = useSettingsContext();

  const { course: currentCourse } = useGetCourse(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sửa thông tin khóa học"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CourseNewEditForm currentCourse={currentCourse} />
    </Container>
  );
}

CourseEditView.propTypes = {
  id: PropTypes.string,
};
