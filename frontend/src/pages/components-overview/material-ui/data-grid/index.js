// material
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, Card, CardHeader } from '@mui/material';
// routes
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import DataGridBasic from './DataGridBasic';
import DataGridCustom from './DataGridCustom';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function DataGridComponent() {
  return (
    <RootStyle title="Components: DataGrid | Minimal-UI">
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Basic" sx={{ mb: 2 }} />
            <Box sx={{ height: 390 }}>
              <DataGridBasic />
            </Box>
          </Card>

          <Card>
            <CardHeader title="Custom" sx={{ mb: 2 }} />
            <Box sx={{ height: 720 }}>
              <DataGridCustom />
            </Box>
          </Card>
        </Stack>
      </Container>
    </RootStyle>
  );
}
