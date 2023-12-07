import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ActivationCodeTableRow({ row, onViewRow, onDeleteRow }) {
  const { activationDate, codeActive, course, creator, student } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover>
      <TableCell>{codeActive}</TableCell>

      <TableCell>
        <ListItemText
          primary={creator ? creator.name : 'trống'}
          secondary={creator && creator.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell>{course.name}</TableCell>

      <TableCell>
        <ListItemText
          primary={activationDate ? format(new Date(activationDate), 'dd MMM yyyy') : 'trống'}
          secondary={activationDate && format(new Date(activationDate), 'p')}
          primaryTypographyProps={activationDate ? { typography: 'body2', noWrap: true } : { typography: 'body2', color: 'text.disabled' }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={student ? student.user.name : 'trống'}
          secondary={student && student.user.email}
          primaryTypographyProps={student ? { typography: 'body2' } : { typography: 'body2', color: 'text.disabled' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  )

  return (
    <>
      {renderPrimary}

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
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Xóa"
        content="Bạn có muốn xóa mã kích hoạt này không?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

ActivationCodeTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
