import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { deleteProduct } from '../../redux/slices/product';
// utils
import { fDate, fToNow, fDateTime } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ProductListHead,
  ProductListToolbar,
  ProductMoreMenu
} from '../../components/_dashboard/e-commerce/product-list';
import { getStaticDeposits } from 'src/redux/slices/investment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'dateCreated', label: 'Date', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'trxId', label: 'Transaction ID', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'paymentMode', label: 'Payment mode', alignRight: false },
  { id: 'status', label: 'Status', alignRight: true },
  { id: 'action', label: 'Action', alignRight: true }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function DepositRequest() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getStaticDeposits());
  }, [dispatch]);
  const { deposits, withdrawal } = useSelector((state) => state.investment);
  console.log(deposits);
  const transactions = [...deposits, ...withdrawal].map((deposit) => {
    return {
      _id: deposit._id,
      method: deposit.method,
      status: deposit.status,
      createdAt: deposit.createdAt,
      amount: deposit.amount
    };
  });
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = transactions.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  const filteredTransaction = applySortFilter(transactions, getComparator(order, orderBy), filterName);

  const isProductNotFound = filteredTransaction.length === 0;

  return (
    <Page title="Account history">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Deposit Request"
          links={[
            { name: 'Dashboard', href: PATH_ADMIN.overview },
            {
              name: 'Deposit request'
            }
          ]}
        />
        {/* <DepositDetail deposit={currentDeposit} setDepositOpen={setDepositOpen} depositOpen={depositOpen} /> */}
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={transactions.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredTransaction.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover key={row?._id} tabIndex={-1}>
                        <TableCell>{row?.createdAt && fDateTime(row?.createdAt)}</TableCell>
                        <TableCell>{`${row?.user?.firstName} ${row?.user?.lastName}`}</TableCell>
                        <TableCell>{row?.transactionId && row?.transactionId}</TableCell>
                        <TableCell padding="checkbox" component="th" scope="row">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {row?.amount && fCurrency(row?.amount)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {row?.method && row?.method}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          {row?.status && (
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={
                                (row?.status === 'failed' && 'error') ||
                                (row?.status === 'pending' && 'warning') ||
                                'success'
                              }
                            >
                              {sentenceCase(row?.status)}
                            </Label>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button as={RouterLink} variant="contained" to={`${PATH_ADMIN.depositRequest}/${row?._id}`}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
          />
        </Card>
      </Container>
    </Page>
  );
}
