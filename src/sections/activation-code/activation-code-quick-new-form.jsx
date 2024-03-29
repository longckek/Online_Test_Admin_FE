import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useGet10Courses } from 'src/api/course';
import { generateActivationCode } from 'src/api/activation-code';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ActivationCodeQuickNewForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const { courses } = useGet10Courses();

  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    if (courses.length) {
      setCourseOptions(courses);
    }
  }, [courses]);

  const NewActivationCodeSchema = Yup.object().shape({});

  const defaultValues = useMemo(
    () => ({
      id: 0,
      name: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewActivationCodeSchema),
    defaultValues,
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSelectCourse = useCallback(
    (option) => {
      setValue(`id`, option);
    },
    [setValue]
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      await generateActivationCode(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      enqueueSnackbar('Cap nhat thanh cong!');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          onClose();
        }
      }}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Tạo mã kích hoạt</DialogTitle>

        <DialogContent>
          <Box rowGap={3} columnGap={2} display="grid">
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
            <RHFSelect name="name" label="Khóa học" InputLabelProps={{ shrink: true }}>
              {courseOptions.map((course) => (
                <MenuItem
                  key={course.id}
                  value={course.name}
                  onClick={() => handleSelectCourse(course.id)}
                >
                  {course.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Hủy
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Tạo
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ActivationCodeQuickNewForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
