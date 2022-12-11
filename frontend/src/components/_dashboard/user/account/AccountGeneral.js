import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
//
import countries from '../countries';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      about: user.about
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="First name" {...getFieldProps('firstName')} />
                  <TextField fullWidth label="Last name" {...getFieldProps('lastName')} />
                </Stack>
                <Stack>
                  <TextField fullWidth disabled label="Email Address" {...getFieldProps('email')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Phone Number" {...getFieldProps('phoneNumber')} />
                  <TextField fullWidth label="Address" {...getFieldProps('address')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField fullWidth label="State/Region" {...getFieldProps('state')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="City" {...getFieldProps('city')} />
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} />
                </Stack>

                <TextField {...getFieldProps('about')} fullWidth multiline minRows={4} maxRows={4} label="About" />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
