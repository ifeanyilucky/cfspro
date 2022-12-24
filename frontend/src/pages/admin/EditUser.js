import { Card, Container, Typography, TextField, Stack, Box } from '@mui/material';
import { styled } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStaticDeposit, update } from 'src/redux/slices/investment';
import { LoadingButton } from '@mui/lab';
import { fCurrency } from 'src/utils/formatNumber';
import { fDateTime } from 'src/utils/formatTime';
import { updateDeposit } from 'src/utils/axios';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getStaticDeposit(id));
  }, []);
  const { deposit, isLoading } = useSelector((state) => state.investment);
  console.log(deposit);
  const handleApprove = () => {};
  if (isLoading) {
    return 'Loading...';
  }

  const handleAction = async (status) => {
    setLoading(true);
    try {
      if (status === 'completed') {
        await updateDeposit({ status: 'completed' }, deposit._id);
        setLoading(false);
        window.location.reload();
      }
      if (status === 'failed') {
        await updateDeposit({ status: 'failed' }, deposit._id);
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Container>
      <CardStyle>
        <Typography variant="h4">Deposit Request from {deposit?.user?.firstName}</Typography>
        <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent="space-between"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Box component="img" src={deposit?.paymentProof} alt="Payment-proof" />
          </Stack>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent="space-between"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Typography variant="body2">Customer name</Typography> &mdash;
            <Typography variant="body2">{deposit?.user?.firstName}</Typography>
          </Stack>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent="space-between"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Typography variant="body2">Amount</Typography> &mdash;
            <Typography variant="subtitle1">{fCurrency(deposit?.amount)}</Typography>
          </Stack>

          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent="space-between"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Typography variant="body2">Deposit method</Typography> &mdash;
            <Typography variant="subtitle1">{deposit?.method}</Typography>
          </Stack>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent="space-between"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Typography variant="body2">Status</Typography> &mdash;
            <Typography variant="subtitle1">{deposit?.status}</Typography>
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
            <Typography variant="subtitle1">{deposit?.createdAt && fDateTime(deposit?.createdAt)}</Typography>
          </Stack>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent="space-between"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Typography variant="body2">User email</Typography> &mdash;
            <Typography variant="body1">{deposit?.user?.email}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ width: 1 }}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="success"
            onClick={() => handleAction('completed')}
          >
            Approve
          </LoadingButton>
          <LoadingButton loading={loading} variant="contained" color="error" onClick={() => handleAction('failed')}>
            Reject
          </LoadingButton>
        </Stack>
      </CardStyle>
    </Container>
  );
}
