import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import personFill from '@iconify/icons-eva/person-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

const TOTAL = 38566;
const CHART_DATA = [44];

export default function AppWidgets1() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> {fNumber(TOTAL)}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          Conversion
        </Typography>
      </Box>
      <IconStyle icon={personFill} />
    </RootStyle>
  );
}
