import { Box, Grid, Switch, Container, Typography, Stack, Chip, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import axios from '../../utils/axios';
import { PricingPlanCard } from '../../components/pricing';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { MIconButton } from 'src/components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { requestWithdrawal } from 'src/redux/slices/investment';

import { LitecoinIcon, BitcoinIcon, USDTIcon } from '../../assets';
import { FemaleSharp } from '@mui/icons-material';

export default function Withdraw() {
  const { state } = useLocation();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpLoading, setOtpLoading] = useState(false);
  const ValidSchema = Yup.object().shape({
    amount: Yup.number().required().min(100, 'Minimum amount to deposit is $100'),
    otp: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      amount: '',
      otp: ''
    },
    validationSchema: ValidSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(requestWithdrawal({ ...values, otp: `${values.otp}` }));
    }
  });
  const { errors, getFieldProps, handleSubmit, values, touched } = formik;

  const handleOTPRequest = async () => {
    setOtpLoading(true);
    try {
      const { data } = await axios.get('/request-otp');
      console.log(data);
      enqueueSnackbar('OTP sent, check your mail', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setOtpLoading(false);
    } catch (error) {
      console.log(error.message);
      setOtpLoading(false);
      enqueueSnackbar('Something went wrong', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  return (
    <Page title="Withdraw">
      <Container>
        <HeaderBreadcrumbs
          heading="Withdraw"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.app },
            { name: 'Withdraw', href: PATH_DASHBOARD.withdraw },
            { name: 'Confirm' }
          ]}
        />
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack spacing={4} maxWidth="sm">
              <Box
                sx={{
                  padding: '10px',
                  width: '260px',
                  backgroundColor: 'primary.main',
                  borderRadius: 10,
                  '&:hover': {
                    opacity: [0.9, 0.8, 0.7]
                  }
                }}
              >
                <Chip label="Your payment method" variant="filled" />
                <Typography component={'span'} variant="caption">
                  {state.method}
                </Typography>
              </Box>
              <Stack spacing={3} maxWidth="sm">
                <Stack>
                  <TextField
                    fullWidth
                    type="number"
                    label="Enter amount"
                    {...getFieldProps('amount')}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                </Stack>
                <Box>
                  <LoadingButton loading={otpLoading} variant="contained" onClick={handleOTPRequest}>
                    Request OTP
                  </LoadingButton>
                </Box>
                <Stack>
                  <TextField
                    fullWidth
                    type="number"
                    label="Enter OTP"
                    {...getFieldProps('otp')}
                    error={Boolean(touched.otp && errors.otp)}
                    helperText={touched.otp ? errors.otp : 'OTP will be sent to your email when you request'}
                  />
                </Stack>
                <LoadingButton type="submit" variant="contained" size="large">
                  Complete request
                </LoadingButton>
              </Stack>
            </Stack>
            <Grid container spacing={3}></Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
