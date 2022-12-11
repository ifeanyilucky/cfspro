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
  TextField,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import { fCurrency } from '../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../routes/paths';
import Page from '../../components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

export default function Deposit() {
  const navigate = useNavigate();
  const DepositSchema = Yup.object().shape({
    amount: Yup.number().required().min(100, 'Minimum amount to deposit is $100'),
    method: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      amount: 0,
      method: 'USD'
    },
    validationSchema: DepositSchema,
    onSubmit: (values) => {
      console.log(values);
      return navigate(PATH_DASHBOARD.payment, { state: values });
    }
  });
  const { errors, getFieldProps, handleSubmit, values, touched } = formik;
  return (
    <Page title="Deposit">
      <Container>
        <HeaderBreadcrumbs
          heading="Deposit"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.app }, { name: 'Deposit' }]}
        />
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8} md={8}>
                <Card>
                  <CardContent>
                    <Stack spacing={5}>
                      <Stack>
                        <TextField
                          fullWidth
                          type="number"
                          label="Enter amount"
                          {...getFieldProps('amount')}
                          error={Boolean(touched.amount && errors.amount)}
                          helperText={touched.amount && errors.amount}
                        />
                      </Stack>
                      <Stack>
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label" mb={3}>
                            Choose Payment Method from the list below
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            {...getFieldProps('method')}
                          >
                            <FormControlLabel value="Bitcoin" control={<Radio />} label="Bitcoin" />
                            <FormControlLabel value="USDT" control={<Radio />} label="USDT" />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                      <Stack>
                        <Button size="large" type="submit">
                          Proceed to Payment
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <Card>
                  <CardContent>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                      <Typography variant="subtitle2">Total Deposit</Typography>
                      <Typography variant="subtitle2">{fCurrency(values.amount)}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>{' '}
    </Page>
  );
}
