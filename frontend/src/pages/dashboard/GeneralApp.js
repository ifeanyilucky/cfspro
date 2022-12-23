// material
import { Container, Grid, Stack, CardContent, Card, CardHeader, Typography } from '@mui/material';
// hooks
import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import { useDispatch, useSelector } from 'src/redux/store';
// components
import Page from '../../components/Page';
import { AppWelcome, AppNewInvoice, AccountSummary } from '../../components/_dashboard/general-app';
import { getAllDeposits } from 'src/redux/slices/investment';
import CopyClipboard from '../../components/CopyClipboard';
import { website } from 'src/config';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeposits());
  }, [dispatch]);

  const { deposits, isLoading } = useSelector((state) => state.investment);

  const { user } = useAuth();
  const referralLink = `${website.url}/ref?id=${user.referralId}`;

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={`${user.firstName} ${user.lastName}`} />
          </Grid>
        </Grid>{' '}
        <AccountSummary user={user} />
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <AppNewInvoice deposits={deposits} isLoading={isLoading} />
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
