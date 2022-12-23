import {
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Button,
  Chip,
  Divider,
  MenuItem,
  TextField
} from '@mui/material';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import { fCurrency, fPercent } from '../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../routes/paths';
import useAuth from 'src/hooks/useAuth';
import { useDispatch, useSelector } from 'src/redux/store';
import { createInvestment } from 'src/redux/slices/investment';
import { LoadingButton } from '@mui/lab';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

const GridStyle = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    direction: 'column'
  }
}));

export default function BuyPlan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { isLoading } = useSelector((state) => state.investment);
  useEffect(() => {
    if (!state) {
      return navigate(PATH_DASHBOARD.plans, { replace: true });
    }
  }, []);

  const ISchema = Yup.object().shape({
    amount: Yup.number()
      .required()
      .min(100, 'Minimum investment about is $100')
      .max(user.accountBalance, 'Sorry you do not have sufficient fund to buy plan'),
    method: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      amount: '',

      plan: state?.plan
    },
    validationSchema: ISchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      dispatch(createInvestment(values, setSubmitting, navigate));
    }
  });

  const { errors, getFieldProps, handleSubmit, values, touched, setFieldValue } = formik;
  const quickPrices = [100, 250, 500, 1000, 1500];

  console.log(state);
  return (
    <Container>
      <HeaderBreadcrumbs
        heading="Buy Plan"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.app },
          { name: 'Plans', href: PATH_DASHBOARD.plans },
          { name: 'Buy plan' }
        ]}
      />
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
                  <Typography variant="body1">You investment details</Typography>
                  <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
                    <Stack
                      component="li"
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      justifyContent="space-between"
                      sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                      <Typography variant="body2">Name of plan</Typography> &mdash;
                      <Typography variant="subtitle1">{state?.plan.name}</Typography>
                    </Stack>
                    <Stack
                      component="li"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1.5}
                      sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                      <Typography variant="body2">Plan duration</Typography> &mdash;
                      <Typography variant="subtitle1">{fCurrency(state?.plan.maxDeposit)}</Typography>
                    </Stack>
                    <Stack
                      component="li"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1.5}
                      sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                      <Typography variant="body2">Daily profit %</Typography> &mdash;
                      <Typography variant="subtitle1">{fPercent(state?.plan.dailyInterest)}</Typography>
                    </Stack>
                    <Stack
                      component="li"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1.5}
                      sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                      <Typography variant="body2">Total Return %</Typography> &mdash;
                      <Typography variant="subtitle1">{fPercent(state?.plan.totalReturn)}</Typography>
                    </Stack>
                  </Stack>
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
                    <LoadingButton loading={isLoading} size="large" type="submit" variant="contained">
                      Confirm & Invest
                    </LoadingButton>
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
