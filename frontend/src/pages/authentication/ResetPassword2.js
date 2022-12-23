import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ResetPasswordForm } from '../../components/authentication/reset-password';
//
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [success, setSuccess] = useState(false);

  return (
    <RootStyle title="Reset Password">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!success ? (
            <>
              <Typography variant="h3" paragraph>
                Rest your password?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Please enter your new password</Typography>

              <ResetPasswordForm onSent={() => setSuccess(true)} />

              <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                Back
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Password reset successful
              </Typography>
              <Typography>You have successfully reset your password &nbsp;</Typography>

              <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                Back
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
