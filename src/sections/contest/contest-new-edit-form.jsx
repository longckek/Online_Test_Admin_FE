import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import slugify from 'slugify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { createContest, updateContest } from 'src/api/contest';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

import ContestNewEditRound from './contest-new-edit-round';


// ----------------------------------------------------------------------

export default function ContestNewEditForm({ currentContest }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewContestSchema = Yup.object().shape({
    name: Yup.string().required('Ten is required'),
    maxNumAttempt: Yup.number('hello').required('Luot thi toi da is required'),
    // not required
    slug: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentContest?.name || '',
      maxNumAttempt: currentContest?.maxNumAttempt || '',
      slug: currentContest?.slug || '',
      rounds: currentContest?.round || []
    }),
    [currentContest]
  );

  const methods = useForm({
    resolver: yupResolver(NewContestSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentContest) {
      reset(defaultValues);
    }
  }, [currentContest, defaultValues, reset]);

  const name = watch('name');

  useEffect(() => {
    const slug = slugify(name, { lower: true, replacement: '_' });
    setValue('slug', slug);
  }, [name, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(currentContest) {
        await updateContest(currentContest.id, data)
      } else {
        await createContest(data)
      }
      reset();
      enqueueSnackbar(currentContest ? 'Thay đổi thành công!' : 'Tạo thành công!');
      router.push(paths.dashboard.contest.root);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent='center'>
        <Grid xs={12} md={10}>
          <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            Thông tin:
          </Typography>
            <Box
              rowGap={3}
              display="grid"
            >
              <RHFTextField name="name" label="Cuộc thi" />
              <RHFTextField name="slug" label="Slug" disabled />
              <RHFTextField name="maxNumAttempt" label="Luot thi toi da" />
            </Box>
            <ContestNewEditRound />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentContest ? 'Tạo cuộc thi' : 'Lưu thay đổi'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ContestNewEditForm.propTypes = {
  currentContest: PropTypes.object,
};
