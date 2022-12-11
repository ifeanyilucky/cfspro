import { merge } from 'lodash';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Stack, Divider, CardHeader, Typography, useMediaQuery } from '@mui/material';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BankingExpensesCategories() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <CardHeader title="Expenses Categories" />

      <Divider />

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Categories</Typography>
          <Typography sx={{ typography: 'h4' }}>9</Typography>
        </Box>

        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>Categories</Typography>
          <Typography sx={{ typography: 'h4' }}>$18,765</Typography>
        </Box>
      </Stack>
    </>
  );
}
