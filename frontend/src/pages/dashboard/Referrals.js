import { Container, Typography, Stack } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import CopyClipboard from 'src/components/CopyClipboard';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';

export default function Referrals() {
  const { user } = useAuth();
  const referralLink = `https://dashboard.crestfinancepro.com/ref=${user.referralId}`;
  return (
    <Page title="Referral">
      <Container>
        <HeaderBreadcrumbs
          heading="Referral"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.app }, { name: 'Referral' }]}
        />
        <Stack sx={{ textAlign: 'center' }} maxWidth="md" mt={5} spacing={2}>
          <Typography variant="h3">Refer users to Crestfinance Pro community</Typography>
          <Typography variant="body1">You can refer users by sharing your referral link:</Typography>
          <CopyClipboard value={referralLink} />
          <Typography variant="body1">Or your referral ID</Typography>
          <Typography variant="h4" sx={{ color: 'Highlight' }}>
            {user.referralId}
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
