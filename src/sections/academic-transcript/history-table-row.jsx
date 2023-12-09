import _ from 'lodash';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function HistoryTableRow({ row, onViewRow }) {
  const { courseMockContest, historyRound, timeStart, timeEnd } = row;
  const { course, mockContest } = courseMockContest;

  const collapse = useBoolean();

  const popover = usePopover();

  const totalMark = (items) => _.reduce(items, (sum, item) => sum + item.mark, 0)

  const renderPrimary = (
    <TableRow hover>
      <TableCell>{course.name}</TableCell>
      <TableCell>{mockContest.name}</TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(timeStart), 'dd MMM yyyy', { locale: vi })}
          secondary={format(new Date(timeStart), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(timeEnd), 'dd MMM yyyy', { locale: vi })}
          secondary={format(new Date(timeEnd), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="center">{historyRound.length ? totalMark(historyRound) : 0}</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: 'action.hover',
            }),
          }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Stack component={Paper} sx={{ m: 1.5 }}>
            {historyRound.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  },
                }}
              >
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    typography: 'body2',
                  }}
                />

                <ListItemText
                  primary="Bat dau"
                  secondary={format(new Date(timeStart), 'p dd MMM yyyy', { locale: vi })}
                  primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                  secondaryTypographyProps={{
                    mt: 0.5,
                    component: 'span',
                    typography: 'caption',
                  }}
                />

                <ListItemText
                  primary="Ket thuc"
                  secondary={format(new Date(timeEnd), 'p dd MMM yyyy', { locale: vi })}
                  primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                  secondaryTypographyProps={{
                    mt: 0.5,
                    component: 'span',
                    typography: 'caption',
                  }}
                />

                <Box sx={{ width: 110, textAlign: 'right' }}>Diem: {item.mark}</Box>
              </Stack>
            ))}
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );
  return (
    <>
      {renderPrimary}

      {renderSecondary}
    </>
  );
}

HistoryTableRow.propTypes = {
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
