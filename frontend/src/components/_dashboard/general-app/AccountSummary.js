import { Grid } from '@mui/material';
import { AppCard } from './index';
import { fNumber, fCurrency } from '../../../utils/formatNumber';

export default function AccountSummary({ user, withdrawal, isLoading }) {
  if (!user && isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(withdrawal);
  const { accountBalance, totalDeposit, totalProfit, referralBonus } = user;

  const pendingWithdrawal = withdrawal?.filter((w) => w.status === 'pending');
  const totalPendingW = pendingWithdrawal?.reduce((a, b) => Number(a) + Number(b?.amount), 0);
  return (
    <Grid container spacing={3} my={5}>
      <Grid item xs={6} sm={6} md={4}>
        <AppCard name="Available balance" value={fCurrency(accountBalance)} />
      </Grid>

      <Grid item xs={6} sm={6} md={4}>
        <AppCard name="Total Profit" value={fCurrency(totalProfit)} />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <AppCard name="Referral Bonus" value={fCurrency(referralBonus)} />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <AppCard name="Total Deposit" value={fCurrency(totalDeposit)} />
      </Grid>

      <Grid item xs={6} sm={6} md={4}>
        <AppCard name="Pending Withdrawal" value={fCurrency(totalPendingW)} />
      </Grid>
    </Grid>
  );
}
