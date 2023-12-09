import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { syncTestOutline, syncTestFormGroup } from 'src/api/sync-data';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function SyncDataInputCodeForm({ sync }) {
  const { type } = sync;

  const { enqueueSnackbar } = useSnackbar();

  const NewInputCodeSchema = Yup.object().shape({
    code: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      code: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewInputCodeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(type === "testOutline") {
        await syncTestOutline(data.code);
      } else if(type === "testFormGroup") {
        await syncTestFormGroup(data.code);
      }
      reset();
      enqueueSnackbar('Đồng bộ thành công!');
      // router.push(paths.dashboard.course.root);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent='center'>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            Code:
          </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
            >
              <RHFTextField name="code" label="Mã" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Đồng bộ
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SyncDataInputCodeForm.propTypes = {
  sync: PropTypes.object,
};
