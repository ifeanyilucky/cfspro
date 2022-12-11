// material
import { styled } from '@mui/material/styles';
import { Box, Container, Stack } from '@mui/material';
// routes
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import { Block } from '../../Block';
import SimpleTransferList from './SimpleTransferList';
import EnhancedTransferList from './EnhancedTransferList';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function TransferListComponent() {
  return (
    <RootStyle title="Components: Transfer List | Minimal-UI">
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="Simple" sx={style}>
            <SimpleTransferList />
          </Block>

          <Block title="Enhanced" sx={style}>
            <EnhancedTransferList />
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
