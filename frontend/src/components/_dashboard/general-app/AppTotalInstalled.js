import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

const PERCENT = 0.15;
const TOTAL_INSTALLED = 4876;
const CHART_DATA = [{ data: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20] }];

export default function AppTotalInstalled() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Total Installed</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
        </Stack>

        <Typography variant="h3">{fNumber(TOTAL_INSTALLED)}</Typography>
      </Box>
    </Card>
  );
}
