import PropTypes from 'prop-types';
import { merge } from 'lodash';
// material
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Stack, Box, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//

// ----------------------------------------------------------------------

const CHART_DATA = [75];
const SOLD_OUT = 120;
const AVAILABLE = 66;

Legend.propTypes = {
  label: PropTypes.string,
  number: PropTypes.number
};

function Legend({ label, number }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(label === 'Sold out' && {
              bgcolor: 'primary.main'
            })
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number} Rooms</Typography>
    </Stack>
  );
}

export default function BookingRoomAvailable() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Room Available" sx={{ mb: 8 }} />

      <Stack spacing={2} sx={{ p: 5 }}>
        <Legend label="Sold out" number={SOLD_OUT} />
        <Legend label="Available" number={AVAILABLE} />
      </Stack>
    </Card>
  );
}
