import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import UserQuickEditForm from './round-quick-edit-form';

// ----------------------------------------------------------------------

export default function RoundTableRow({ row, onViewRow }) {
  const { codeTestFormGroup, maxMark, name, showCorrectAnswer, showLabelAnswer, showMark, timeStart, timeEnd, timeAllow} = row;
  console.log('winter-round-row: ', row);
  const showOptions = [
    { label: 'Hiện thị đáp án', value: showCorrectAnswer },
    { label: 'Hiện thị nhãn', value: showLabelAnswer },
    { label: 'Hiện thị điểm', value: showMark },
  ]
  const confirm = useBoolean();

  const collapse = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>

      <TableCell align="center">{maxMark}</TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(timeStart), 'dd MMM yyyy')}
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
          primary={format(new Date(timeEnd), 'dd MMM yyyy')}
          secondary={format(new Date(timeEnd), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="center">{timeAllow} phút</TableCell>
      <TableCell align="center">{codeTestFormGroup}</TableCell>

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

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            // onEditRow();
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
    </>
  );
}

RoundTableRow.propTypes = {
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
