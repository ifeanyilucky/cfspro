import { Icon } from '@iconify/react';
import { useState } from 'react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
// components
import Page from '../../../components/Page';

import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const MOCK_ACCORDIONS = [...Array(4)].map((_, index) => ({
  id: mockData.id(index),
  value: `panel${index + 1}`,
  heading: `Accordion ${index + 1}`,
  subHeading: mockData.text.title(index),
  detail: mockData.text.description(index)
}));

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function AccordionComponent() {
  const [controlled, setControlled] = useState(false);

  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setControlled(isExpanded ? panel : false);
  };

  return (
    <RootStyle title="Components: Accordion | Minimal-UI">
      <Container>
        <Block title="Simple" sx={{ mb: 5 }}>
          {MOCK_ACCORDIONS.map((accordion, index) => (
            <Accordion key={accordion.value} disabled={index === 3}>
              <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                <Typography variant="subtitle1">{accordion.heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{accordion.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Block>

        <Block title="Controlled">
          {MOCK_ACCORDIONS.map((item, index) => (
            <Accordion
              key={item.value}
              disabled={index === 3}
              expanded={controlled === item.value}
              onChange={handleChangeControlled(item.value)}
            >
              <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
                <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
                  {item.heading}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.subHeading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Block>
      </Container>
    </RootStyle>
  );
}
