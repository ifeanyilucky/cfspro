import React from 'react';
import { Button, Stack, Modal, Box, Typography, Dialog, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { updateWithdrawal } from 'src/utils/axios';
import { fCurrency } from 'src/utils/formatNumber';

export default function WithdrawalDetail({ withdrawal, withdrawalOpen, setWithdrawalOpen }) {
  const [loading, setLoading] = React.useState(false);
  console.log(withdrawal);
  const handleAction = async (status) => {
    setLoading(true);
    try {
      if (status === 'completed') {
        await updateWithdrawal({ status: 'completed' }, withdrawal._id);
        setLoading(false);
        window.location.reload();
      }
      if (status === 'failed') {
        await updateWithdrawal({ status: 'failed' }, withdrawal._id);
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={withdrawalOpen} onClose={() => setWithdrawalOpen(false)}>
        <DialogContent>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Withdrawal information
            </Typography>
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
                  {withdrawal?.user?.firstName} {withdrawal?.user?.lastName}
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
                <Typography variant="body2">{withdrawal?.user?.email} </Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Customer Account Balance</Typography> &mdash;
                <Typography variant="subtitle1">{fCurrency(withdrawal?.user?.accountBalance)}</Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Customer Profit</Typography> &mdash;
                <Typography variant="subtitle1">{fCurrency(withdrawal?.user?.totalProfit)}</Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Customer Total Withdrawal</Typography> &mdash;
                <Typography variant="subtitle1">{fCurrency(withdrawal?.user?.totalWithdrawal)}</Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Transaction ID</Typography> &mdash;
                <Typography variant="body2">{withdrawal?.transactionId} </Typography>
              </Stack>
              <Stack
                component="li"
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <Typography variant="body2">Withdrawal Status</Typography> &mdash;
                <Typography variant="body2">{withdrawal?.status} </Typography>
              </Stack>
            </Stack>
            <Stack direction={'row'} spacing={2}>
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
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
