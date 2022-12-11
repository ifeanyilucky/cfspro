import * as Yup from 'yup';
import { useFormik, FormikProvider, Form } from 'formik';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// material
import { Box, Grid, Card, Button, Typography, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useSelector, useDispatch } from '../../../../redux/store';
import { createWithdrawalMethod, getWithdrawalMethod } from '../../../../redux/slices/investment';

// ----------------------------------------------------------------------

export default function AccountBilling() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWithdrawalMethod());
  }, [dispatch]);
  const { isLoading, withdrawalMethod } = useSelector((state) => state.investment);
  console.log(withdrawalMethod);

  const formik = useFormik({
    initialValues: {
      bitcoin: '',
      ethereum: '',
      litecoin: ''
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      dispatch(createWithdrawalMethod(values));

      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Withdrawal method added successfully', { variant: 'success' });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
              Withdrawal method
            </Typography>

            <Box
              sx={{
                padding: 3,
                marginTop: 3,
                borderRadius: 1,
                bgcolor: 'background.neutral'
              }}
            >
              {withdrawalMethod && (
                <FormikProvider value={formik}>
                  <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Enter Bitcoin Address"
                          {...getFieldProps('bitcoin')}
                          error={Boolean(touched.bitcoin && errors.bitcoin)}
                          helperText={touched.bitcoin && errors.bitcoin}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Enter Ethereum Address"
                          {...getFieldProps('ethereum')}
                          error={Boolean(touched.ethereum && errors.ethereum)}
                          helperText={touched.ethereum && errors.ethereum}
                          defaultValue={withdrawalMethod[1].ethereum}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Enter Litecoin Address"
                          {...getFieldProps('litecoin')}
                          error={Boolean(touched.litecoin && errors.litecoin)}
                          helperText={touched.litecoin && errors.litecoin}
                        />
                      </Stack>

                      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                        <LoadingButton type="submit" variant="contained" loading={isLoading}>
                          Save Change
                        </LoadingButton>
                      </Stack>
                    </Stack>
                  </Form>
                </FormikProvider>
              )}
            </Box>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
