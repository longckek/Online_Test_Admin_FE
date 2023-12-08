import * as Yup from 'yup';
import slugify from 'slugify';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { createCourse, updateCourse } from 'src/api/course';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

import CourseNewEditContest from './course-new-edit-contest';

// ----------------------------------------------------------------------

export default function CourseNewEditForm({ currentCourse }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewCourseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required'),
    // not required
    slug: Yup.string(),
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCourse?.name || '',
      price: currentCourse?.price || '',
      slug: currentCourse?.slug || '',
      description: currentCourse?.description || '',
      contests: currentCourse?.mockContest || []
    }),
    [currentCourse]
  );

  const methods = useForm({
    resolver: yupResolver(NewCourseSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentCourse) {
      reset(defaultValues);
    }
  }, [currentCourse, defaultValues, reset]);

  const name = watch('name');

  useEffect(() => {
    const slug = slugify(name, { lower: true, replacement: '_' });
    setValue('slug', slug);
  }, [name, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(currentCourse) {
        await updateCourse(currentCourse.id, data)
      } else {
        await createCourse(data)
      }
      reset();
      enqueueSnackbar(currentCourse ? 'Thay đổi thành công!' : 'Tạo thành công!');
      router.push(paths.dashboard.course.root);
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
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Khóa học" />
              <RHFTextField name="slug" label="Slug" disabled />
              <RHFTextField name="price" label="Giá" />
              <RHFTextField name="description" label="Miêu tả" />
            </Box>
            <CourseNewEditContest />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentCourse ? 'Tạo khóa học' : 'Lưu thay đổi'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CourseNewEditForm.propTypes = {
  currentCourse: PropTypes.object,
};
