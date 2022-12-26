import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
  Box,
  Card,
  Menu,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@mui/material';
//
import Scrollbar from '../../Scrollbar';
import { PATH_ADMIN } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function BookingDetails({ users }) {
  return (
    <>
      <Card>
        <CardHeader title="Latest users" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Created at</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Balance</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Profit Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, 5).map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar>{row?.firstName}</Avatar>
                        <Typography variant="subtitle2">
                          {row?.firstName} {row?.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{format(new Date(row?.createdAt), 'dd MMM yyyy')}</TableCell>
                    <TableCell>{row?.accountBalance}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{row?.totalProfit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {users.length < 1 && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      <Box sx={{ py: 3 }}>
                        <Typography variant="body1">No users found</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to={PATH_ADMIN.allUser}
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}
