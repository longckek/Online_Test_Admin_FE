import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ActivationCodeDetailsContent({ job }) {
  const { skills, createdAt, employmentTypes } = job;

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">Code: 1N9NHG</Typography>

      <Typography variant="h6">Ngày kích hoạt: 2023</Typography>

      <Stack
        component={Paper}
        variant="outlined"
        spacing={2}
        direction="row"
        sx={{ p: 3, borderRadius: 2, mt: 3 }}
      >
        <Avatar
          alt={job.company.name}
          src={job.company.logo}
          variant="rounded"
          sx={{ width: 64, height: 64 }}
        />

        <Stack spacing={1}>
          <Typography variant="subtitle1">{job.company.name} - 20231234</Typography>
          <Typography variant="body2">{job.company.fullAddress}</Typography>
          <Typography variant="body2">{job.company.phoneNumber}</Typography>
          <Typography variant="body2">{job.company.phoneNumber}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );

  const renderCourse = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      <Typography variant="h6">Khóa học</Typography>
      {[
        {
          label: 'Tên',
          value: 'TSA Danh gia tu duy',
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Giá',
          value: employmentTypes,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Ngày khởi tạo',
          value: fDate(createdAt),
          icon: <Iconify icon="solar:calendar-date-bold" />,
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

  const renderCreator = (
    <Stack component={Card} spacing={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
      <Typography variant="h6">Người tạo</Typography>
      {[
        {
          label: 'Tên',
          value: 'TSA Danh gia tu duy',
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Email',
          value: employmentTypes,
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
        {renderContent}
      </Grid>

      <Grid xs={12} md={4}>
        {renderCourse}

        {renderCreator}
      </Grid>
    </Grid>
  );
}

ActivationCodeDetailsContent.propTypes = {
  job: PropTypes.object,
};
