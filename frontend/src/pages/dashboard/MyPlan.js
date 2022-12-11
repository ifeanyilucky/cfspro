import { Typography, Container, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../../components/Page';

export default function MyPlan() {
  const plan = null;

  return (
    <Page title="My Plan">
      <Container>
        <HeaderBreadcrumbs
          heading="My plan"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.app }, { name: 'My plan' }]}
        />
        {!plan ? (
          <Typography variant="subtitle1">
            You do not have an investment plan at the moment or no value match your query.
          </Typography>
        ) : (
          ''
        )}
      </Container>
    </Page>
  );
}
