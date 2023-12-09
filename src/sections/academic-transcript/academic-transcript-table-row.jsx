import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function AcademicTranscriptTableRow({ row, onViewRow }) {
  const { birthday, phoneNumber, school, studentCode, user } = row;
  const { name, email } = user;

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover>

      <TableCell>
        <ListItemText
          primary={name}
          secondary={email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>
      <TableCell>{studentCode}</TableCell>

      <TableCell>{phoneNumber}</TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(birthday), 'dd MMM yyyy', { locale: vi })}
          secondary={format(new Date(birthday), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>{school}</TableCell>

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
          Xem
        </MenuItem>
      </CustomPopover>
    </>
  );
}

AcademicTranscriptTableRow.propTypes = {
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
