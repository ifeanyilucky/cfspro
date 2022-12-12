// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, CardHeader, Stack } from '@mui/material';
// routes
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import BasicTable from './BasicTable';
import CollapsibleTable from './collapsible-table';
import SortingSelecting from './sorting-selecting';
import GroupingFixedHeader from './GroupingFixedHeader';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TableComponent() {
  return (
    <RootStyle title="Components: Table">
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Basic Table" />
            <BasicTable />
          </Card>

          <Card>
            <SortingSelecting />
          </Card>

          <Card>
            <CardHeader title="Grouping & FixedHeader" />
            <GroupingFixedHeader />
          </Card>

          <Card>
            <CardHeader title="Collapsible Table" />
            <CollapsibleTable />
          </Card>
        </Stack>
      </Container>
    </RootStyle>
  );
}
