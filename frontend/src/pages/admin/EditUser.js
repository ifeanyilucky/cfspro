import { Card, Container, Typography, TextField, Stack, Box } from '@mui/material';
import { styled } from '@mui/styles';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleUser } from 'src/redux/slices/user';
import { LoadingButton } from '@mui/lab';
import { fCurrency } from 'src/utils/formatNumber';
import { fDateTime } from 'src/utils/formatTime';
import { useFormik, Form, FormikProvider } from 'formik';
import * as api from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'src/components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5)
  }
}));
export default function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);
  const { user, isLoading } = useSelector((state) => state.user);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      accountBalance: user?.accountBalance,
      totalProfit: user?.totalProfit,
      referralBonus: user?.referralBonus
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(true);
      try {
        await api.editUser(values, id);
        setSubmitting(false);
        enqueueSnackbar('User account updated successfully', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        enqueueSnackbar('Something went wrong, try again!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    },
    enableReinitialize: true
  });

  const { handleSubmit, getFieldProps, isSubmitting, setValues } = formik;

  return (
    <Container>
      {isLoading && !user ? (
        'Loading...'
      ) : (
        <Stack spacing={3} direction={{ sm: 'row', xs: 'column' }}>
          <CardStyle>
            <Typography variant="h4">Customer information</Typography>
            <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Customer name</Typography> &mdash;
                <Typography variant="body2">
                  {user?.firstName} {user?.lastName}
                </Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Customer email</Typography> &mdash;
                <Typography variant="body2">{user?.email} </Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Referral ID</Typography> &mdash;
                <Typography variant="body2">{user?.referralId} </Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Referrer ID</Typography> &mdash;
                <Typography variant="body2">{user?.referrerId} </Typography>
              </Stack>

              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Account Balance</Typography> &mdash;
                <Typography variant="subtitle1">{fCurrency(user?.accountBalance)}</Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Total Profit</Typography> &mdash;
                <Typography variant="subtitle1">{fCurrency(user?.totalProfit)}</Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Total Withdrawal</Typography> &mdash;
                <Typography variant="subtitle1">{fCurrency(user?.totalWithdrawal)}</Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Referral Bonus</Typography> &mdash;
                <Typography variant="subtitle1">{fCurrency(user?.referralBonus)}</Typography>
              </Stack>

              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Date created</Typography> &mdash;
                <Typography variant="subtitle1">{user?.createdAt && fDateTime(user?.createdAt)}</Typography>
              </Stack>
            </Stack>
          </CardStyle>
          <CardStyle>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ my: 5, width: 1 }}>
                  <TextField label="Account balance" {...getFieldProps('accountBalance')} />
                  <TextField label="Total profit" {...getFieldProps('totalProfit')} />
                  <TextField label="Referral Bonus" {...getFieldProps('referralBonus')} />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ width: 1 }}>
                  <LoadingButton loading={isSubmitting} variant="contained" color="success" type="submit">
                    Update
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </CardStyle>
        </Stack>
      )}
    </Container>
  );
}
