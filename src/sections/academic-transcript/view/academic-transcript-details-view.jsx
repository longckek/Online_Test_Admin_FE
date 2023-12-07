import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs, JOB_PUBLISH_OPTIONS } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import AcademicTranscriptDetailsToolbar from '../academic-transcript-details-toolbar';
import AcademicTranscriptDetailsContent from '../academic-transcript-details-content';

// ----------------------------------------------------------------------

export default function AcademicTranscriptDetailsView({ id }) {
  const settings = useSettingsContext();

  const currentJob = _jobs.filter((job) => job.id === id)[0];

  const [publish, setPublish] = useState(currentJob?.publish);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

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

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <AcademicTranscriptDetailsToolbar
        backLink={paths.dashboard.academicTranscript.root}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={JOB_PUBLISH_OPTIONS}
      />
      {renderTabs}

      <AcademicTranscriptDetailsContent job={currentJob} />
    </Container>
  );
}

AcademicTranscriptDetailsView.propTypes = {
  id: PropTypes.string,
};
