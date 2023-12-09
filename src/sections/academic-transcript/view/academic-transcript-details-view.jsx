import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetStudent } from 'src/api/student'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { AcademicTranscriptDetailsSkeleton } from '../academic-transcript-skeleton'
import AcademicTranscriptDetailsToolbar from '../academic-transcript-details-toolbar';
import AcademicTranscriptDetailsStudent from '../academic-transcript-details-student';

// ----------------------------------------------------------------------

export default function AcademicTranscriptDetailsView({ id }) {
  const { student, studentLoading, studentError } = useGetStudent(id)

  const settings = useSettingsContext();

  const renderSkeleton = <AcademicTranscriptDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${studentError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.academicTranscript.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Trở lại
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderTabs = (
    <Tabs
      value='academicTranscript'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='academicTranscript'
        iconPosition="end"
        value='academicTranscript'
        label="Bảng điểm học tập"
      />
    </Tabs>
  );

  const renderAcademicTranscript = student && (
    <>
      <AcademicTranscriptDetailsToolbar
        backLink={paths.dashboard.academicTranscript.root}
        liveLink="#"
      />
      {renderTabs}

      <AcademicTranscriptDetailsStudent student={student} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {studentLoading && renderSkeleton}

      {studentError && renderError}

      {student && renderAcademicTranscript}
    </Container>
  );
}

AcademicTranscriptDetailsView.propTypes = {
  id: PropTypes.string,
};
