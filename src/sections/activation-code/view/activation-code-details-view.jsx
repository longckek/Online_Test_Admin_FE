import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs, JOB_PUBLISH_OPTIONS } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import ActivationCodeDetailsToolbar from '../activation-code-details-toolbar';
import ActivationCodeDetailsContent from '../activation-code-details-content';

// ----------------------------------------------------------------------

export default function ActivationCodeDetailsView({ id }) {
  const settings = useSettingsContext();

  const currentJob = _jobs.filter((job) => job.id === id)[0];

  const [publish, setPublish] = useState(currentJob?.publish);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value='activationCode'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='activationCode'
        iconPosition="end"
        value='activationCode'
        label="Chi tiết mã kích hoạt"
      />
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <ActivationCodeDetailsToolbar
        backLink={paths.dashboard.activationCode.root}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={JOB_PUBLISH_OPTIONS}
      />
      {renderTabs}

      <ActivationCodeDetailsContent job={currentJob} />
    </Container>
  );
}

ActivationCodeDetailsView.propTypes = {
  id: PropTypes.string,
};
