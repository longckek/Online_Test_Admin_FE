import _ from 'lodash';
import { useEffect, useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useGetRounds } from 'src/api/round'

import Iconify from 'src/components/iconify';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ContestNewEditRound() {
  const { rounds, roundsLoading, roundsEmpty } = useGetRounds();

  const { control, setValue, watch, resetField } = useFormContext();

  const [roundOptions, setRoundOptions] = useState([]);

  useEffect(() => {
    if (rounds.length) {
      setRoundOptions(rounds);
    }
  }, [rounds]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rounds',
  });

  const values = watch();
  const handleAdd = () => {
    append({
      name: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleSelectRound = useCallback(
    (index, option) => {
      setValue(
        `rounds[${index}].id`,
        option
      );
    },
    [setValue]
  );

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Vòng thi:
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
              <RHFTextField
                size="small"
                name={`rounds[${index}].aliasRound.name`}
                label="Ten thay the"
                InputLabelProps={{ shrink: true }}
              />

              <RHFSelect
                name={`rounds[${index}].name`}
                size="small"
                label="Vòng thi"
                InputLabelProps={{ shrink: true }}
                sx={{
                  maxWidth: { md: 3 / 4 },
                }}
              >
                {roundOptions.map((round) => (
                  <MenuItem
                    key={round.id}
                    value={round.name}
                    onClick={() => handleSelectRound(index, round.id)}
                  >
                    {round.name}
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
          Thêm vòng thi
        </Button>
      </Stack>
    </Box>
  );
}
