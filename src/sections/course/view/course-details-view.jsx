import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetCourse } from 'src/api/course'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { CourseDetailsSkeleton } from '../course-skeleton'
import CourseDetailsToolbar from '../course-details-toolbar';
import CourseDetailsContent from '../course-details-content';

// ----------------------------------------------------------------------

export default function CourseDetailsView({ id }) {
  const { course, courseLoading, courseError } = useGetCourse(id)
  const settings = useSettingsContext();

  const renderSkeleton = <CourseDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${courseError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.course.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderTabs = (
    <Tabs
      value='course'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='course'
        iconPosition="end"
        value='course'
        label="Chi tiết khóa học"
      />
    </Tabs>
  );

  const renderCourse = course && (
    <>
      <CourseDetailsToolbar
        backLink={paths.dashboard.course.root}
        liveLink="#"
      />
      {renderTabs}

      <CourseDetailsContent course={course} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {courseLoading && renderSkeleton}

      {courseError && renderError}

      {course && renderCourse}
    </Container>
  );
}

CourseDetailsView.propTypes = {
  id: PropTypes.string,
};
