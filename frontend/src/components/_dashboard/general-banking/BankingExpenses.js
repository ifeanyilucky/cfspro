import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import diagonalArrowRightUpFill from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../utils/formatNumber';
//

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  position: 'relative',
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(3),
  right: theme.spacing(3),
  justifyContent: 'center',
  color: theme.palette.warning.lighter,
  backgroundColor: theme.palette.warning.dark
}));

// ----------------------------------------------------------------------

const TOTAL = 8938;
const PERCENT = -0.5;
const CHART_DATA = [{ data: [76, 20, 84, 135, 56, 134, 122, 49] }];

export default function BankingExpenses() {
  const theme = useTheme();

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={diagonalArrowRightUpFill} width={24} height={24} />
      </IconWrapperStyle>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Typography sx={{ typography: 'subtitle2' }}>Expenses</Typography>
        <Typography sx={{ typography: 'h3' }}>{fCurrency(TOTAL)}</Typography>
        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <Icon width={20} height={20} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
          <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
            &nbsp;than last month
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
