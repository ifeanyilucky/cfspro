// material
import { Container, Grid, Stack, CardContent, Card, CardHeader, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AppWelcome,
  AppWidgets1,
  AppWidgets2,
  AppFeatured,
  AppNewInvoice,
  AppTotalDownloads,
  AppTotalInstalled,
  AppTotalActiveUsers,
  AccountSummary
} from '../../components/_dashboard/general-app';
import CopyClipboard from '../../components/CopyClipboard';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const referralLink = `https://crestfinancepro.com/ref=${user.referralId}`;
  return (
    <Page title="Crestfinance Pro - Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={`${user.firstName} ${user.lastName}`} />
          </Grid>
        </Grid>{' '}
        <AccountSummary user={user} />
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>
        </Grid>
        <Grid mt={5}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h4">Refer us and earn</Typography>
                <Typography variant="p">Use the below link to invite your friends.</Typography>

                <CopyClipboard value={referralLink} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}