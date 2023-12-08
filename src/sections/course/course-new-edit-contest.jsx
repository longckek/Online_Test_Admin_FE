import { useState, useEffect, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useGetContests } from 'src/api/contest'

import Iconify from 'src/components/iconify';
import { RHFSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CourseNewEditContest() {
  const { contests } = useGetContests();

  const { control, setValue } = useFormContext();

  const [contestOptions, setContestOptions] = useState([]);

  useEffect(() => {
    if (contests.length) {
      setContestOptions(contests);
    }
  }, [contests]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contests',
  });

  const handleAdd = () => {
    append({
      name: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(
        `contests[${index}].id`,
        option
      );
    },
    [setValue]
  );

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Cuộc thi:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ width: 1 }}
              justifyContent="space-between"
            >
              <RHFSelect
                name={`contests[${index}].name`}
                size="small"
                label="Name"
                InputLabelProps={{ shrink: true }}
                sx={{
                  maxWidth: { md: 3 / 4 },
                }}
              >
                {contestOptions.map((contest) => (
                  <MenuItem
                    key={contest.id}
                    value={contest.name}
                    onClick={() => handleSelectService(index, contest.id)}
                  >
                    {contest.name}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              >
                Xóa
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Thêm cuộc thi
        </Button>
      </Stack>
    </Box>
  );
}
