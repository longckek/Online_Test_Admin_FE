import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _jobs, JOB_PUBLISH_OPTIONS } from 'src/_mock';
import { useGetActivationCode } from 'src/api/activation-code'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { ActivationCodeDetailsSkeleton } from '../activation-code-skeleton'
import ActivationCodeDetailsToolbar from '../activation-code-details-toolbar';
import ActivationCodeDetailsContent from '../activation-code-details-content';

// ----------------------------------------------------------------------

export default function ActivationCodeDetailsView({ id }) {
  const { activationCode, activationCodeLoading, activationCodeError } = useGetActivationCode(id)

  const settings = useSettingsContext();

  const renderSkeleton = <ActivationCodeDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${activationCodeError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.activationCode.root}
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

  const renderActivationCode = activationCode && (
    <>
      <ActivationCodeDetailsToolbar
        backLink={paths.dashboard.activationCode.root}
        liveLink="#"
      />
      {renderTabs}

      <ActivationCodeDetailsContent activationCode={activationCode} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {activationCodeLoading && renderSkeleton}

      {activationCodeError && renderError}

      {activationCode && renderActivationCode}
    </Container>
  );
}

ActivationCodeDetailsView.propTypes = {
  id: PropTypes.string,
};
