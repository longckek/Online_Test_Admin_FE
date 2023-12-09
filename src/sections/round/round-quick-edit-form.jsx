import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { updateRound } from 'src/api/round'

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RoundQuickEditForm({ currentRound, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewRoundSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    maxMark: Yup.number().required('Mark is required'),
    timeAllow: Yup.number().required('Time Allow is required'),
    timeStart: Yup.mixed().nullable().required('Time start is required'),
    timeEnd: Yup.mixed()
      .required('Time end is required')
      .test(
        'date-min',
        'Time end must be later than Time start',
        (value, { parent }) => value.getTime() > parent.timeStart.getTime()
      ),
    showCorrectAnswer: Yup.boolean(),
    showLabelAnswer: Yup.boolean(),
    showMark: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentRound?.name || '',
      maxMark: currentRound?.maxMark || '',
      timeAllow: currentRound?.timeAllow || '',
      timeStart: currentRound?.timeStart ? new Date(currentRound?.timeStart) : new Date(),
      timeEnd: currentRound?.timeEnd ? new Date(currentRound?.timeEnd) : null,
      showCorrectAnswer: currentRound?.showCorrectAnswer || true,
      showLabelAnswer: currentRound?.showLabelAnswer || false,
      showMark: currentRound?.showMark || true,
      codeTestFormGroup: currentRound?.codeTestFormGroup,
    }),
    [currentRound]
  );

  const methods = useForm({
    resolver: yupResolver(NewRoundSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentRound) {
      reset(defaultValues);
    }
  }, [currentRound, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateRound(currentRound?.id, data);
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
        <DialogTitle>Sửa vòng thi</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFTextField name="name" label="Tên vòng thi" />
            <RHFTextField name="maxMark" label="Diem" />

            <Controller
              name="timeStart"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Thời gian bắt đầu"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="timeEnd"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Thời gian kết thúc"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
            <RHFTextField name="timeAllow" label="Thời gian làm bài" />
            <RHFTextField name="codeTestFormGroup" label="Code" disabled />

            <RHFCheckbox name="showCorrectAnswer" label="Hiển thị đáp án" />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFCheckbox name="showLabelAnswer" label="Hiển thị nhãn" />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            <RHFCheckbox name="showMark" label="Hiển thị điểm" />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => {
            reset();
            onClose();
          }}>
            Hủy
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Cập nhật
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

RoundQuickEditForm.propTypes = {
  currentRound: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
