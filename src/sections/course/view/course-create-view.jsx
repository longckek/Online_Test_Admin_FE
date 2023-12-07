import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CourseNewEditForm from '../course-new-edit-form';

// ----------------------------------------------------------------------

export default function CourseCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Tạo khóa học mới"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CourseNewEditForm />
    </Container>
  );
}
