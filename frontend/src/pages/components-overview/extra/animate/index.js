import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// routes
// components
import Page from '../../../../components/Page';
//
import Inview from './inview';
import OtherView from './other';
import ScrollView from './scroll';
import DialogView from './dialog';
import BackgroundView from './background';

// ----------------------------------------------------------------------

const TAB_LIST = [
  { label: 'In View', component: <Inview /> },
  { label: 'Scroll', component: <ScrollView /> },
  { label: 'Dialog', component: <DialogView /> },
  { label: 'Background', component: <BackgroundView /> },
  { label: 'Other', component: <OtherView /> }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function Animate() {
  const [value, setValue] = useState('In View');

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RootStyle title="Components: Animate">
      <Container maxWidth="lg">
        <TabContext value={value}>
          <Box sx={{ mb: 5 }}>
            <TabList onChange={handleChangeTab}>
              {TAB_LIST.map((tab) => (
                <Tab key={tab.label} label={tab.label} value={tab.label} disableRipple />
              ))}
            </TabList>
          </Box>
          {TAB_LIST.map((tab) => (
            <TabPanel key={tab.label} value={tab.label}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </RootStyle>
  );
}
