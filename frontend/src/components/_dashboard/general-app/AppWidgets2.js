import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import emailFill from '@iconify/icons-eva/email-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.warning.darker
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

const TOTAL = 55566;
const CHART_DATA = [75];

export default function AppWidgets2() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> {fNumber(TOTAL)}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          Conversion
        </Typography>
      </Box>
      <IconStyle icon={emailFill} />
    </RootStyle>
  );
}
