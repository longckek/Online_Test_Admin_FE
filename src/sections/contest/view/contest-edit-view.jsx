import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { useGetContest } from 'src/api/contest'

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ContestNewEditForm from '../contest-new-edit-form';

// ----------------------------------------------------------------------

export default function ContestEditView({ id }) {
  const settings = useSettingsContext();

  const { contest: currentContest } = useGetContest(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sửa cuộc thi"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ContestNewEditForm currentContest={currentContest} />
    </Container>
  );
}

ContestEditView.propTypes = {
  id: PropTypes.string,
};
