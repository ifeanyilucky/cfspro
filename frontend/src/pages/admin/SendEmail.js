import { Container, Typography, Stack, Box, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useFormik, FormikProvider, Form } from 'formik';
import axios from '../../utils/axios';
import Page from '../../components/Page';
import { getUserList } from 'src/redux/slices/user';
import { MIconButton } from 'src/components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_ADMIN } from 'src/routes/paths';

export default function SendEmail() {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(getUserList());
  }, []);
  const { userList } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      subject: '',
      email: '',
      message: ''
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      console.log(values);
      await axios
        .post(`/static/send-email`, values)
        .then((res) => {
          enqueueSnackbar('Email sent successfully!', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
          resetForm();
        })
        .catch((err) => {
          setSubmitting(false);
        });
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps, errors, touched } = formik;

  return (
    <Page title="Send email to customer">
      <Container maxWidth="768px">
        <HeaderBreadcrumbs
          heading="Send email"
          links={[{ name: 'Dashboard', href: PATH_ADMIN.root }, { name: 'Send email' }]}
        />
        {!userList ? (
          'loading'
        ) : (
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                  <TextField
                    id="date"
                    label="Subject"
                    type="text"
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    {...getFieldProps('subject')}
                  />
                  <TextField label="Recipient" fullWidth select {...getFieldProps('email')}>
                    {userList.map((user) => (
                      <MenuItem key={user?._id} value={user?.email}>
                        {user?.firstName} {user?.lastName} ({user?.email})
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack>
                  <TextField fullWidth multiline rows={10} label="Message" {...getFieldProps('message')} />
                </Stack>
                <LoadingButton type="submit" loading={isSubmitting} variant="contained" fullWidth size="large">
                  Submit
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        )}
      </Container>
    </Page>
  );
}
