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
  Chip,
  Divider,
  TextField,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import { fCurrency } from '../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../routes/paths';
import useAuth from 'src/hooks/useAuth';

const GridStyle = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    direction: 'column'
  }
}));

export default function BuyPlan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const DepositSchema = Yup.object().shape({
    amount: Yup.number()
      .required()
      .min(100, 'Minimum investment about is $100')
      .max(user.accountBalance, 'Sorry you do not have sufficient fund to buy plan'),
    method: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      amount: '',
      method: 'USD'
    },
    validationSchema: DepositSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });
  const { errors, getFieldProps, handleSubmit, values, touched, setFieldValue } = formik;
  const quickPrices = [100, 250, 500, 1000, 1500];

  return (
    <Container>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Stack spacing={5}>
                    <Stack spacing={2}>
                      <Typography variant="subtitle1">Choose quick amount to invest</Typography>
                      <Stack direction={'row'} spacing={2}>
                        {quickPrices.map((price) => (
                          <Chip
                            size="medium"
                            label={fCurrency(price)}
                            clickable
                            onClick={(e) => {
                              setFieldValue('amount', price);
                              console.log(price);
                            }}
                          />
                        ))}
                      </Stack>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography variant="body1">Or enter amount:</Typography>
                      <TextField
                        fullWidth
                        type="number"
                        label="Enter amount"
                        {...getFieldProps('amount')}
                        error={Boolean(touched.amount && errors.amount)}
                        helperText={touched.amount && errors.amount}
                        value={values.amount}
                      />
                    </Stack>
                    <Stack>
                      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                        <Typography variant="subtitle2">Account balance</Typography>
                        <Typography variant="subtitle2">{fCurrency(user.accountBalance)}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Grid container spacing={2} mb={1}>
                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Name of plan</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          Hedge Fund
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Plan Price</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          {fCurrency(values.amount)}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Duration</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          1 Day
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Profit</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          1.2% Weekly
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Minimum Deposit</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          {fCurrency(1000)}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Maximum Deposit</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          {fCurrency(50000)}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Minimum Return</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          12%
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">Maximum Return Return</Typography>
                        <Typography variant="caption" sx={{ color: 'Highlight' }}>
                          13.75%
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2} my={1}>
                    <Grid item>
                      <Typography variant="body2">Payment method:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" sx={{ color: 'Highlight' }}>
                        Account Balance
                      </Typography>
                    </Grid>
                  </Grid>
                  <Stack>
                    <Button size="large" type="submit" variant="contained">
                      Confirm & Invest
                    </Button>
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
