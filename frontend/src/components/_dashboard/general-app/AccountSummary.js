import { Grid } from '@mui/material';
import { AppCard } from './index';
import { fNumber, fCurrency } from '../../../utils/formatNumber';

export default function AccountSummary({ user }) {
  if (!user) {
    return <h1>Loading...</h1>;
  }

  const { accountBalance, totalDeposit, totalProfit, referralBonus, totalWithdrawal } = user;
  return (
    <Grid container spacing={3} my={5}>
      <Grid item xs={12} sm={6} md={4}>
        <AppCard name="Account balance" value={fCurrency(accountBalance)} />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <AppCard name="Total Profit" value={fCurrency(totalProfit)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AppCard name="Referral Bonus" value={fCurrency(referralBonus)} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <AppCard name="Total Deposit" value={fCurrency(totalDeposit)} />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <AppCard name="Total Withdrawal" value={fCurrency(totalWithdrawal)} />
      </Grid>
    </Grid>
  );
}
