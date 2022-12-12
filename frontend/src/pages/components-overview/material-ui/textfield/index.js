import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Tab } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
// routes
// material
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import Filled from './Filled';
import Standard from './Standard';
import Outlined from './Outlined';

// ----------------------------------------------------------------------

const TEXTFIELDS = [
  { name: 'Filled', component: <Filled /> },
  { name: 'Standard', component: <Standard /> },
  { name: 'Outlined', component: <Outlined /> }
];

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TextFieldComponent() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ----------------------------------------------------------------------

  return (
    <RootStyle title="Components: TextField">
      <Container maxWidth="lg">
        <form noValidate autoComplete="off">
          <TabContext value={value}>
            <TabList onChange={handleChange}>
              {TEXTFIELDS.map((tab, index) => (
                <Tab disableRipple key={tab.name} label={tab.name} value={String(index + 1)} />
              ))}
            </TabList>

            {TEXTFIELDS.map((tab, index) => (
              <TabPanel key={tab.name} value={String(index + 1)} sx={{ mt: 5 }}>
                {tab.component}
              </TabPanel>
            ))}
          </TabContext>
        </form>
      </Container>
    </RootStyle>
  );
}
