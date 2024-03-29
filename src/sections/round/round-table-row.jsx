import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import RoundQuickEditForm from './round-quick-edit-form';

// ----------------------------------------------------------------------

export default function RoundTableRow({ row, onViewRow }) {
  const { name, isShowAnswer, isShowResult, isShowScore, timeStart, timeEnd, roundType} = row;
  const showOptions = [
    { label: 'Hiện thị đáp án', value: isShowAnswer },
    { label: 'Hiện thị nhãn', value: isShowResult },
    { label: 'Hiện thị điểm', value: isShowScore },
  ]
  const collapse = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>

      <TableCell align="center">{100}</TableCell>

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

      <TableCell align="center">{roundType}</TableCell>

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

        {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
      </TableCell>
    </TableRow>
  )

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
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  },
                }}
            >
              {showOptions.map((item, index) => (
                <ListItemText
                  key={index}
                  primary={item.label}
                  secondary={<Checkbox checked={item.value} />}
                  primaryTypographyProps={{
                    typography: 'body2',
                  }}
                  sx={{ textAlign: "center"}}
                />
              ))}
            </Stack>
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  )


  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <RoundQuickEditForm currentRound={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Sửa
        </MenuItem>
      </CustomPopover>
    </>
  );
}

RoundTableRow.propTypes = {
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
