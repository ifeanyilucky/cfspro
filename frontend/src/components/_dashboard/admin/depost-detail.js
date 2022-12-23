import React from 'react';
import { Button, Stack, Modal, Box, Typography, Dialog, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { updateDeposit } from 'src/utils/axios';
import { fCurrency } from 'src/utils/formatNumber';

export default function DepositDetail({ deposit, depositOpen, setDepositOpen }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  const [loading, setLoading] = React.useState(false);
  console.log(deposit);
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
    <div>
      <Dialog open={depositOpen} onClose={() => setDepositOpen(false)}>
        <DialogContent>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Deposit information
            </Typography>
            <Box component="img" src={deposit?.paymentProof} alt="payment-proof" width="100%" />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {fCurrency(deposit?.amount)}
            </Typography>
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
