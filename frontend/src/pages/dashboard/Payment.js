import {
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  CardHeader
} from '@mui/material';
import { useLocation, Navigate, useNavigate } from 'react-router';
import { useFormik, FormikProvider, Form } from 'formik';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { fCurrency } from '../../utils/formatNumber';
import { UploadSingleFile } from '../../components/upload';
import { addDeposit } from '../../redux/slices/investment';
import axios from 'axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'src/components/@material-extend';
import { LoadingButton } from '@mui/lab';
import { USDTIcon, BitcoinIcon } from 'src/assets';

export default function Deposit() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [fileHolder, setFileHolder] = useState(null);
  const [equivalentAmount, setEquivalentAmount] = useState('');
  const isMountedRef = useIsMountedRef();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const formData = new FormData();
  useEffect(() => {
    axios
      .get(`https://api.coinconvert.net/convert/usd/btc?amount=1`)
      .then(({ data }) => {
        console.log(data);
        const btc = data.USD;
        setEquivalentAmount(btc);
        console.log(equivalentAmount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [equivalentAmount]);

  const formik = useFormik({
    initialValues: {
      amount: state?.amount || '',
      method: state?.method || '',
      paymentProof: null
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      formData.append('file', fileHolder);
      formData.append('upload_preset', 'crestfi');
      formData.append('cloud_name', 'dd3sg5fnj');

      await axios
        .post('https://api.cloudinary.com/v1_1/dd3sg5fnj/image/upload', formData)
        .then(({ data }) => {
          dispatch(addDeposit({ ...values, paymentProof: data?.secure_url }));
          console.log(values, data.secure_url);
          enqueueSnackbar('Account Fund Successful! Please wait for system to validate this transaction.', {
            variant: 'success',
            autoHideDuration: 7000,
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
          if (isMountedRef.current) {
            setSubmitting(false);
          }
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          //   setErrors({afterSubmit: error.})
          setSubmitting(false);
        });
      console.log(values);
      console.log('formdata' + formData);
    }
  });
  const { errors, isSubmitting, handleSubmit, touched, values, setFieldValue } = formik;

  const handleDropFile = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      setFileHolder(file);
      if (file) {
        setFieldValue('paymentProof', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );
  if (!state) {
    return <Navigate to="/deposit" replace />;
  }

  return (
    <Container maxWidth="lg">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    You are to make payment of {fCurrency(state?.amount)} using your selected payment method.
                  </Typography>

                  <Stack spacing={5}>
                    <Stack spacing={2} my={4}>
                      {state?.method === 'Bitcoin' ? <BitcoinIcon width="30%" /> : <USDTIcon width="30%" />}
                    </Stack>

                    <Stack spacing={3}>
                      <TextField
                        label="Payment Address"
                        value={'38GfiszknmXY7osbFVtabfNt5LHS8Vdmpu'}
                        helperText="Copy and send the exact amount below, to this address"
                      />
                      <TextField label="Amount" value={fCurrency(state?.amount)} />
                      <TextField label="Bitcoin Equivalent" value={equivalentAmount} />
                    </Stack>
                    <Stack>
                      <Typography variant="body1"> Upload Payment proof after payment.</Typography>
                    </Stack>
                    <UploadSingleFile
                      accept="image/*"
                      file={values.paymentProof}
                      error={Boolean(touched.paymentProof && errors.paymentProof)}
                      onDrop={handleDropFile}
                    />
                    <Stack>
                      <LoadingButton loading={isSubmitting} variant="contained" fullWidth size="large" type="submit">
                        Upload payment
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Container>
  );
}
