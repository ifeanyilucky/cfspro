import { Card, Container, Typography, TextField, Stack } from '@mui/material';
import { styled } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStaticDeposit, update } from 'src/redux/slices/investment';
import { LoadingButton } from '@mui/lab';

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
export default function DepositRequestDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaticDeposit(id));
  }, []);
  const { deposit, isLoading } = useSelector((state) => state.investment);
  console.log(deposit);
  const handleApprove = () => {};
  if (isLoading) {
    return 'Loading...';
  }

  return (
    <Container>
      <CardStyle>
        <Typography variant="h4">Deposit Request for {id}</Typography>
        <Stack>
          <Typography variant="body1">{deposit?.amount}</Typography>
          <Typography variant="body1">{deposit?.method}</Typography>
          <Typography variant="body1">{deposit?.status}</Typography>
          <Typography variant="body1">{deposit?.createdAt}</Typography>
          <Typography variant="body1">Payment Proof</Typography> <img src={deposit?.paymentProof} alt="payment-proof" />
          <Typography variant="body1">{deposit?.user?.firstName}</Typography>
          <Typography variant="body1">{deposit?.user?.email}</Typography>
        </Stack>
        <LoadingButton size="large">Reject</LoadingButton>
        <LoadingButton size="large">Accept</LoadingButton>
      </CardStyle>
    </Container>
  );
}
