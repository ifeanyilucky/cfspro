import { merge } from 'lodash';
// material
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider, useMediaQuery } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function BookingCheckInWidgets({ totalUsers, totalInvestments }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card>
      <Stack direction="row" divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ width: 1, py: 5 }}>
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(totalUsers)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Registered users
            </Typography>
          </div>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ width: 1, py: 5 }}>
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(totalInvestments)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Total Investments
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}
