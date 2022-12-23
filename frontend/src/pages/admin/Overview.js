import { useEffect } from 'react';
// material
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  BookingTotal,
  BookingCheckIn,
  BookingDetails,
  BookingCheckOut,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingCheckInWidgets,
  BookingCustomerReviews
} from '../../components/_dashboard/general-booking';
import { useDispatch, useSelector } from 'src/redux/store';
import { getUserList } from 'src/redux/slices/user';
import { getStaticDeposits } from 'src/redux/slices/investment';
// ----------------------------------------------------------------------

export default function AdminOverview() {
  const { themeStretch } = useSettings();
  const { userList } = useSelector((state) => state.user);
  const { investments, deposits } = useSelector((state) => state.investment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getStaticDeposits());
  }, [dispatch]);

  console.log(userList);
  const totalDeposit = deposits?.reduce((a, b) => a + b?.amount, 0);
  const totalProfit = userList?.reduce((a, b) => a + b?.totalProfit, 0);
  const totalInvestments = investments?.reduce((a, b) => a + b?.amount, 0);

  return (
    <Page title="Admin Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <BookingCheckInWidgets totalInvestments={investments.length} totalUsers={userList?.length} />
          </Grid>

          <Grid item xs={6} md={4}>
            <BookingTotalIncomes title="Total investment fund" amount={totalInvestments} />
          </Grid>
          <Grid item xs={6} md={4}>
            <BookingTotalIncomes title="Total deposit fund" amount={totalDeposit} />
          </Grid>
          <Grid item xs={6} md={4}>
            <BookingTotalIncomes title="Total profit fund" amount={totalProfit} />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails users={userList} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
