// material
import { styled } from '@mui/material/styles';
import { Box, Paper, Container, Stack } from '@mui/material';
// routes
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import { Block } from '../../Block';
import CustomizedStepper from './CustomizedStepper';
import VerticalLinearStepper from './VerticalLinearStepper';
import LinearAlternativeLabel from './LinearAlternativeLabel';
import HorizontalLinearStepper from './HorizontalLinearStepper';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function StepperComponent() {
  return (
    <RootStyle title="Components: StepperView | Minimal-UI">
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="Horizontal Linear Stepper">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <HorizontalLinearStepper />
            </Paper>
          </Block>

          <Block title="Linear Alternative Label">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <LinearAlternativeLabel />
            </Paper>
          </Block>

          <Block title="Vertical Linear Stepper">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <VerticalLinearStepper />
            </Paper>
          </Block>

          <Block title="Customized Stepper">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <CustomizedStepper />
            </Paper>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
