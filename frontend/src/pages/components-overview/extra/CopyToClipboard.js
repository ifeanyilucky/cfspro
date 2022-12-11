// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, CardContent } from '@mui/material';
// routes
// components
import Page from '../../../components/Page';
import CopyClipboard from '../../../components/CopyClipboard';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function CopyToClipboard() {
  return (
    <RootStyle title="Components: Copy To Clipboard | Minimal-UI">
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <CopyClipboard value="https://www.npmjs.com/package/react-copy-to-clipboard" />
          </CardContent>
        </Card>
      </Container>
    </RootStyle>
  );
}
