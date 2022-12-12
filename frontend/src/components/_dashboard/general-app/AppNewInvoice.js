import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { useTheme } from '@mui/material/styles';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Menu,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  TableContainer
} from '@mui/material';
// utils
import _ from 'lodash';
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fToNow } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AppNewInvoice({ deposits, isLoading }) {
  const transaction = deposits;
  if (isLoading) {
    return 'Loading...';
  }
  return (
    <Card>
      <CardHeader title={`Recent transactions (${transaction?.length})`} sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction mode</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.length ? (
                transaction.slice(0, 5).map((row) => {
                  return (
                    <TableRow key={row?._id}>
                      <TableCell>{row?.amount && fCurrency(row?.amount)}</TableCell>
                      <TableCell>{row?.method && row?.method}</TableCell>
                      <TableCell>{row?.createdAt && fToNow(row?.createdAt)}</TableCell>
                      <TableCell>
                        {row?.status && (
                          <Label
                            variant={'ghost'}
                            color={
                              (row?.status === 'pending' && 'warning') ||
                              (row?.status === 'failed' && 'error') ||
                              'success'
                            }
                          >
                            {sentenceCase(row?.status)}
                          </Label>
                        )}
                      </TableCell>
                      <TableCell align="right">{/* <MoreMenuButton /> */}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', margin: '0 auto' }}>
                  No record yet
                </Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to={PATH_DASHBOARD.transaction}
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
