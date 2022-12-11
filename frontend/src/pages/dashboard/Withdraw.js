import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import { PricingPlanCard } from '../../components/pricing';
import { PATH_DASHBOARD } from 'src/routes/paths';

import { LitecoinIcon, BitcoinIcon, USDTIcon } from '../../assets';

const PLANS = [
  {
    subscription: 'Bitcoin',
    icon: <BitcoinIcon />,

    lists: [
      { text: 'Minimum withdrawable amount', sub: '$10' },
      { text: 'Maximum withdrawable amount', sub: '10,000' },
      { text: 'Charge Type', sub: 'percentage' },
      { text: 'Charges Amount', sub: '0%' },
      { text: 'Duration', sub: 'Instant' }
    ],
    labelAction: 'Request Withdrawal'
  },
  {
    subscription: 'USDT',
    icon: <USDTIcon />,

    lists: [
      { text: 'Minimum withdrawable amount', sub: '$10' },
      { text: 'Maximum withdrawable amount', sub: '$2,100' },
      { text: 'Charge Type', sub: 'percentage' },
      { text: 'Charges Amount', sub: '0%' },
      { text: 'Duration', sub: 'Instant' }
    ],
    labelAction: 'Request Withdrawal'
  },
  {
    subscription: 'Litecoin',
    icon: <LitecoinIcon />,

    lists: [
      { text: 'Minimum withdrawable amount', sub: '$100' },
      { text: 'Maximum withdrawable amount', sub: '$10,000' },
      { text: 'Charge Type', sub: 'percentage' },
      { text: 'Charges Amount', sub: '0%' },
      { text: 'Duration', sub: 'Instant' }
    ],
    labelAction: 'Request Withdrawal'
  }
];

export default function Withdraw() {
  return (
    <Page title="Withdraw">
      <Container>
        <HeaderBreadcrumbs
          heading="Withdraw"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.app }, { name: 'Withdraw' }]}
        />

        <Typography variant="h3" align="center" paragraph>
          Place a withdrawal request
        </Typography>
        <Grid container spacing={3}>
          {PLANS.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PricingPlanCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
