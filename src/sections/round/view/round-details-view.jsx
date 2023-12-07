import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs, JOB_PUBLISH_OPTIONS } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import RoundDetailsToolbar from '../round-details-toolbar';
import RoundDetailsContent from '../round-details-content';

// ----------------------------------------------------------------------

export default function RoundDetailsView({ id }) {
  const settings = useSettingsContext();

  const currentJob = _jobs.filter((job) => job.id === id)[0];

  const [publish, setPublish] = useState(currentJob?.publish);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value='round'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='round'
        iconPosition="end"
        value='round'
        label="Chi tiết vòng thi"
      />
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RoundDetailsToolbar
        backLink={paths.dashboard.round.root}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={JOB_PUBLISH_OPTIONS}
      />
      {renderTabs}

      <RoundDetailsContent job={currentJob} />
    </Container>
  );
}

RoundDetailsView.propTypes = {
  id: PropTypes.string,
};
