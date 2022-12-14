import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Tab } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
// routes
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import TextButtons from './TextButtons';
import IconButtons from './IconButtons';
import ButtonGroups from './ButtonGroups';
import ToggleButtons from './ToggleButtons';
import OutlinedButtons from './OutlinedButtons';
import ContainedButtons from './ContainedButtons';
import FloatingActionButton from './FloatingActionButton';

// ----------------------------------------------------------------------

const BUTTONS = [
  { name: 'Contained Buttons', component: <ContainedButtons /> },
  { name: 'Outlined Buttons', component: <OutlinedButtons /> },
  { name: 'TextButtons', component: <TextButtons /> },
  { name: 'Icon Buttons', component: <IconButtons /> },
  { name: 'Floating Action Button', component: <FloatingActionButton /> },
  { name: 'Button Groups', component: <ButtonGroups /> },
  { name: 'Toggle Buttons', component: <ToggleButtons /> }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function ButtonsComponent() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RootStyle title="Components: Buttons">
      <Container maxWidth="lg">
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            {BUTTONS.map((tab, index) => (
              <Tab disableRipple key={tab.name} label={tab.name} value={String(index + 1)} />
            ))}
          </TabList>

          {BUTTONS.map((tab, index) => (
            <TabPanel key={tab.name} value={String(index + 1)} sx={{ mt: 5 }}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </RootStyle>
  );
}
