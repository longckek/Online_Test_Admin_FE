import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SyncDataInputCodeForm from '../sync-data-input-code';

// ----------------------------------------------------------------------

export default function SyncDataTestOutlineView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Đồng bộ dữ liệu khung đề"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SyncDataInputCodeForm sync={{ type: "testOutline"}} />
    </Container>
  );
}
