import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.darker,
  color: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string
};

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome back to Crestfinance Pro,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        {/* <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
        </Typography> */}
      </CardContent>
    </RootStyle>
  );
}
