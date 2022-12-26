import { useEffect } from 'react';
import { Container, Typography, Stack, Box, Divider } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import CopyClipboard from 'src/components/CopyClipboard';
import { PATH_DASHBOARD } from 'src/routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import { website } from 'src/config';
import { useDispatch, useSelector } from 'src/redux/store';
import { getUserList } from 'src/redux/slices/user';
import { fCurrency } from 'src/utils/formatNumber';

export default function Referrals() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);
  const referralLink = `${website.url}/ref?id=${user.referralId}`;
  const { userList } = useSelector((state) => state.user);

  if (!userList.length) {
    return <h4>Loading...</h4>;
  }
  const referredUsers = userList.filter((user) => user.referrerId === user?.referralId);

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
          <Box sx={{ width: '100%' }}>
            <Stack divider={<Divider orientation="vertical" />} spacing={3} direction={{ xs: 'column', sm: 'row' }}>
              <Stack>
                <Typography variant="subtitle1">Referred users</Typography>
                <Typography variant="subtitle1">{referredUsers.length}</Typography>
              </Stack>
              <Stack>
                <Typography variant="subtitle1">Referral Commission</Typography>
                <Typography variant="subtitle1">{user?.referralBonus && fCurrency(user?.referralBonus)}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Page>
  );
}
