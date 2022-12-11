import { useState, useEffect, useRef } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Stack } from '@mui/material';
// routes
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import ProgressLinear from './ProgressLinear';
import ProgressCircular from './ProgressCircular';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function ProgressComponent() {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <RootStyle title="Components: Progress | Minimal-UI">
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="Circular">
            <ProgressCircular progress={progress} />
          </Block>

          <Block title="Linear">
            <ProgressLinear progress={progress} buffer={buffer} />
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
