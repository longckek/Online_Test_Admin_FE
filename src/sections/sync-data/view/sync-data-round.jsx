import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useSnackbar } from 'src/components/snackbar';

import { syncTestTakerGroup } from 'src/api/sync-data'

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function SyncDataRoundView() {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await syncTestTakerGroup();
      enqueueSnackbar('Đồng bộ thành công!');
      // router.push(paths.dashboard.course.root);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Đồng bộ dữ liệu vòng thi"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" onClick={() => onSubmit()}>
          Đồng bộ
        </Button>
      </Stack>
    </Container>
  );
}
