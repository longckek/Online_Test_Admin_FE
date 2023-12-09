import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';

import { GOOGLE_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function GoogleLoginView() {
  const handleLoginWithRedirect = () => {
    window.open(`${GOOGLE_LOGIN}`, '_self');
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5, mt: 10 }}>
        Đăng nhập
      </Typography>

      <Stack spacing={5}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handleLoginWithRedirect}
          startIcon={
            <Iconify icon="devicon:google" width={24} />
          }
        >
          Đăng nhập bằng Gmail
        </Button>
      </Stack>
    </>
  );
}
