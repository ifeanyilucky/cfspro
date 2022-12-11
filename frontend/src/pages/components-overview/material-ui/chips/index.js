// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, CardHeader, CardContent } from '@mui/material';
// routes
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import ChipFilled from './ChipFilled';
import ChipOutlined from './ChipOutlined';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function ChipsComponent() {
  return (
    <RootStyle title="Components: Chip | Minimal-UI">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Filled" />
              <CardContent>
                <ChipFilled />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Outlined" />
              <CardContent>
                <ChipOutlined />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
