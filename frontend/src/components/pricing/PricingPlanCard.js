import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { styled } from '@mui/material/styles';
import { Card, Button, Typography, Box, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
//
import Label from '../Label';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object
};

export default function PricingPlanCard({ card, index }) {
  const { subscription, icon, lists, labelAction } = card;
  const navigate = useNavigate();

  const handleRequest = (method) => {
    navigate(PATH_DASHBOARD.withdrawConfirm, { state: { method } });
  };

  return (
    <RootStyle>
      {index === 0 && (
        <Label
          color="info"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute'
          }}
        >
          POPULAR
        </Label>
      )}

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {subscription}
      </Typography>

      {/* <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize'
        }}
      >
        {caption}
      </Typography> */}

      <Box sx={{ width: 80, height: 80, mt: 3 }}>{icon}</Box>

      <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: 'text.primary' }}
          >
            <Typography variant="body2">{item.text}:</Typography>
            <Typography variant="subtitle1">{item.sub}</Typography>
          </Stack>
        ))}
      </Stack>

      <Button fullWidth size="large" variant="contained" onClick={() => handleRequest(subscription)}>
        {labelAction}
      </Button>
    </RootStyle>
  );
}
