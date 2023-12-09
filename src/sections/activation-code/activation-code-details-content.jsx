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

// ----------------------------------------------------------------------

export default function ActivationCodeDetailsContent({ activationCode }) {
  const { activationDate, course, creator, student, codeActive } = activationCode;

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">Code: {codeActive}</Typography>

      { activationDate && (<Typography variant="h6">Ngày kích hoạt: {fDate(activationDate)}</Typography>)}

      <Stack
        component={Paper}
        variant="outlined"
        spacing={2}
        direction="row"
        sx={{ p: 3, borderRadius: 2, mt: 3 }}
      >
        { student ? (
          <>
            <Avatar
              alt={student.user.name}
              src={student.user.avatar}
              variant="rounded"
              sx={{ width: 64, height: 64 }}
            />

            <Stack spacing={1}>
              <Typography variant="subtitle1">
                {student.user.name} - {student.studentCode}
              </Typography>
              <Typography variant="body2">{student.user.email}</Typography>
              <Typography variant="body2">{student.phoneNumber}</Typography>
              <Typography variant="body2">{student.school}</Typography>
            </Stack>
          </>
        ): "Chưa có học sinh đăng kí"}
      </Stack>
    </Stack>
  );

  const renderCourse = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      <Typography variant="h6">Khóa học</Typography>
      {[
        {
          label: 'Tên',
          value: course.name,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Giá',
          value: course.price,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Ngày khởi tạo',
          value: fDate(course.createdAt),
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

  const renderCreator = creator && (
    <Stack component={Card} spacing={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
      <Typography variant="h6">Người tạo</Typography>
      {[
        {
          label: 'Tên',
          value: creator.name,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Email',
          value: creator.email,
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
  activationCode: PropTypes.object,
};
