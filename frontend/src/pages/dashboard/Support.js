import { Typography, Container, Button, Box, TextField, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import plusFill from '@iconify/icons-eva/plus-fill';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../components/Page';
import { supportEmail } from 'src/utils/websiteInfo';
import * as api from 'src/utils/axios';

export default function MyPlan() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // await api.
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title="Support">
      <Container>
        <HeaderBreadcrumbs
          heading="Support"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.app }, { name: 'Support' }]}
        />
        <Box textAlign="center" maxWidth={'768px'} margin="0 auto">
          <Stack spacing={3}>
            <Typography variant="h3">Crestfinance Pro Support</Typography>
            <Typography variant="body1">For inquiries, suggestions or complains. Mail us</Typography>
            <Typography variant="body1">{supportEmail}</Typography>
            <TextField
              variant="filled"
              multiline
              label="Message"
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
            />
            <LoadingButton variant="contained" loading={isLoading} onClick={handleSubmit} fullWidth size="large">
              Send
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Page>
  );
}
