import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

import AcademicTranscriptDetailsContest from './academic-transcript-details-content'

// ----------------------------------------------------------------------

export default function AcademicTranscriptDetailsStudent({ student }) {
  const { address, birthday, phoneNumber, school, studentCode, user } = student;
  const { name, email, avatar } = user;

  const renderStudent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Stack
        component={Paper}
        variant="outlined"
        spacing={2}
        direction="row"
        sx={{ p: 3, borderRadius: 2, mt: 3 }}
      >
        <>
          <Avatar alt={name} src={avatar} variant="rounded" sx={{ width: 64, height: 64 }} />

          <Stack spacing={1}>
            <Typography variant="subtitle1">
              {name} - {studentCode}
            </Typography>
            {[
              {
                label: email,
                icon: <Iconify icon="solar:clock-circle-bold" />,
              },
              {
                label: phoneNumber,
                icon: <Iconify icon="solar:clock-circle-bold" />,
              },
              {
                label: school,
                icon: <Iconify icon="solar:clock-circle-bold" />,
              },
            ].map((item) => (
              <Stack key={item.label} spacing={1.5} direction="row">
                {item.icon}
                <Typography variant="body2">{item.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </>
      </Stack>
    </Stack>
  );

  const renderStudentMore = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Ngày sinh',
          value: fDate(birthday),
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Địa chỉ',
          value: address,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        {renderStudent}
      </Grid>

      <Grid xs={12} md={4}>
        {renderStudentMore}
      </Grid>
      <AcademicTranscriptDetailsContest student={student} />
    </Grid>
  );
}

AcademicTranscriptDetailsStudent.propTypes = {
  student: PropTypes.object,
};
