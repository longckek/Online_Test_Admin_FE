import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CourseDetailsContent({ job }) {
  const {
    skills,
    createdAt,
    employmentTypes,
  } = job;

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">TSA Danh gia tu duy</Typography>
        <IconButton>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Box>
      <Typography variant="h6">Miêu tả</Typography>
      <Typography variant="body1">3 môn chính toán, văn, anh</Typography>
      {/* <Markdown children={content} /> */}

      <Stack spacing={2}>
        <Typography variant="h6">Cuộc thi: </Typography>
        <Stack direction="column" alignItems="start" spacing={1}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} variant="soft" />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );

  const renderOverview = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
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
        {
          label: 'Người tạo',
          value: 'Vatlysieunham@gmail.com',
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
        {renderOverview}
      </Grid>
    </Grid>
  );
}

CourseDetailsContent.propTypes = {
  job: PropTypes.object,
};
