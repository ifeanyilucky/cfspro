import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import CloseIcon from '@iconify/icons-ic/close';
import { Icon } from '@iconify/react';
import { useFormik, FormikProvider, Form } from 'formik';
import { updateUser } from 'src/redux/slices/user';
import { useDispatch } from 'src/redux/store';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Icon icon={<CloseIcon />} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function EditUserDialog({ open, setOpen, user }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  let acctBalRef = React.useRef(null);
  let totalProfitRef = React.useRef(null);
  let refBonusRef = React.useRef(null);

  acctBalRef.current.value = user?.accountBalance;
  totalProfitRef.current.value = user?.totalProfit;
  refBonusRef.current.value = user?.referralBonus;
  console.log(refBonusRef);
  const formik = useFormik({
    initialValues: {
      accountBalance: acctBalRef.current?.value,
      totalProfit: totalProfitRef.current?.value,
      referralBonus: refBonusRef.current?.value
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    }
  });
  const { handleSubmit, errors, getFieldProps, touched, isSubmitting } = formik;
  console.log(user);
  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={open}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              Edit {user?.firstName} {user?.lastName} Account
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Account Balance"
                    {...getFieldProps('accountBalance')}
                    error={Boolean(touched.accountBalance && errors.accountBalance)}
                    helperText={touched.accountBalance && errors.accountBalance}
                    ref={acctBalRef}
                  />

                  <TextField
                    fullWidth
                    label="Total Profit"
                    {...getFieldProps('totalProfit')}
                    error={Boolean(touched.totalProfit && errors.totalProfit)}
                    helperText={touched.totalProfit && errors.totalProfit}
                    ref={totalProfitRef}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="Referral Bonus"
                  {...getFieldProps('referralBonus')}
                  error={Boolean(touched.referralBonus && errors.referralBonus)}
                  helperText={touched.referralBonus && errors.referralBonus}
                  ref={refBonusRef}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </BootstrapDialog>
    </div>
  );
}
