import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <Typography variant="h5" color={PRIMARY_LIGHT} fontSize="20px" sx={{ fontSize: '18px' }}>
        Crestfinance-Pro
      </Typography>
    </Box>
  );
}
