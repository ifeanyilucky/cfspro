import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Divider,
  Button,
  Box,
  styled
} from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fCurrency, fPercent } from 'src/utils/formatNumber';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'CFP Ultimate Plan',
    dailyInterest: 2,
    termDays: 90,
    minDeposit: 100,
    maxDeposit: 5000,
    totalReturn: 180,
    depositReturn: 'No'
  },
  {
    name: 'CFP Standard Plan',
    dailyInterest: 2.5,
    termDays: 90,
    minDeposit: 5001,
    maxDeposit: 10000,
    totalReturn: 225,
    depositReturn: 'No'
  },
  {
    name: 'CFP Compact Plan',
    dailyInterest: 3,
    termDays: 90,
    minDeposit: 10001,
    maxDeposit: 15000,
    totalReturn: 270,
    depositReturn: 'No'
  },
  {
    name: 'CFP Premium Plan',
    dailyInterest: 3.72,
    termDays: 90,
    minDeposit: 15001,
    maxDeposit: 50000,
    totalReturn: 335,
    depositReturn: 'No'
  },
  {
    name: 'CFP Exclusive Plan',
    dailyInterest: 3,
    termDays: 90,
    minDeposit: 50001,
    maxDeposit: 500000,
    totalReturn: 520,
    depositReturn: 'No'
  },
  {
    name: 'CFP VIP Plan',
    dailyInterest: 3,
    termDays: 90,
    minDeposit: 500001,
    maxDeposit: 1000000,
    totalReturn: 600,
    depositReturn: 'No'
  }
];

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5)
  }
}));

export default function Plan() {
  const navigate = useNavigate();
  const handleChoosePlan = (plan) => {
    navigate(PATH_DASHBOARD.buyPlan, { state: { plan } });
  };
  return (
    <Container>
      <HeaderBreadcrumbs
        heading="Buy Plan"
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.app }, { name: 'Plans' }]}
      />
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item key={plan.name} xs={12} sm={6} md={4}>
            <CardStyle textAlign="center">
              <Typography variant="h4">{plan.name}</Typography>
              <Typography textAlign="center" variant="body2" sx={{ color: 'text.secondary' }}>
                Enjoy entry level of invest & earn money.
              </Typography>

              <Stack direction="row" justifyContent="space-between" width="100%" textAlign="center">
                <Box>
                  <Typography variant="h4">{fPercent(plan.dailyInterest)}</Typography>
                  <Typography variant="body2">Daily Interest</Typography>
                </Box>
                <Box>
                  <Typography variant="h4">{plan.termDays}</Typography>
                  <Typography variant="body2">Term Days</Typography>
                </Box>
              </Stack>
              <Divider variant="middle" />
              {/* <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize'
        }}
      >
        {caption}
      </Typography> */}

              <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
                <Stack
                  component="li"
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  justifyContent="space-between"
                  sx={{ typography: 'body2', color: 'text.secondary' }}
                >
                  <Typography variant="body2">Min Deposit</Typography> &mdash;
                  <Typography variant="subtitle1">{fCurrency(plan.minDeposit)}</Typography>
                </Stack>
                <Stack
                  component="li"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ typography: 'body2', color: 'text.secondary' }}
                >
                  <Typography variant="body2">Max Deposit</Typography> &mdash;
                  <Typography variant="subtitle1">{fCurrency(plan.maxDeposit)}</Typography>
                </Stack>
                <Stack
                  component="li"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ typography: 'body2', color: 'text.secondary' }}
                >
                  <Typography variant="body2">Deposit Return</Typography> &mdash;
                  <Typography variant="subtitle1">{plan.depositReturn}</Typography>
                </Stack>
                <Stack
                  component="li"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ typography: 'body2', color: 'text.secondary' }}
                >
                  <Typography variant="body2">Total Return</Typography> &mdash;
                  <Typography variant="subtitle1">{fPercent(plan.totalReturn)}</Typography>
                </Stack>
              </Stack>

              <Button fullWidth size="large" variant="contained" onClick={() => handleChoosePlan(plan)}>
                Chose this plan
              </Button>
            </CardStyle>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
