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

// ----------------------------------------------------------------------

export default function AdminOverview() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <BookingTotalIncomes title="Total investment fund" amount={939} />
          </Grid>
          <Grid item xs={6} md={4}>
            <BookingTotalIncomes title="Total Deposit fund" amount={4933} />
          </Grid>
          <Grid item xs={6} md={4}>
            <BookingTotalIncomes title="Total interest fund" amount={3400} />
          </Grid>

          <Grid item xs={12} md={12}>
            <BookingCheckInWidgets />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
