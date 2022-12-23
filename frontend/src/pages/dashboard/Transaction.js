import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowUp from '@iconify/icons-eva/diagonal-arrow-right-up-fill';
import arrowDown from '@iconify/icons-eva/diagonal-arrow-left-down-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Avatar,
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
import { getProducts, deleteProduct } from '../../redux/slices/product';
// utils
import { fDate, fDateTime, fToNow } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
import { getAllDeposits, getTransaction } from 'src/redux/slices/investment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'transactionId', label: 'Transaction ID', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'remarks', label: 'Remarks', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'dateCreated', label: 'Date', alignRight: true },
  { id: '' }
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

export default function Transaction() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getTransaction());
  }, [dispatch]);
  const { transaction } = useSelector((state) => state.investment);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = transaction.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transaction.length) : 0;

  const filteredTransaction = applySortFilter(transaction, getComparator(order, orderBy), filterName);

  const isProductNotFound = filteredTransaction.length === 0;
  console.log(transaction);
  return (
    <Page title="Account history">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account History"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.app },
            {
              name: 'Account History'
            }
          ]}
        />
        <Card>
          <ProductListToolbar numSelected={selected.length} filterName={filterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={transaction.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {transaction.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover key={row?._id} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="none">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {row?.transactionId}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          <Typography variant="body1" color={row?.transactionType === 'in' ? 'green' : 'red'}>
                            {row?.transactionType === 'in' ? '+' : '-'}
                            {fCurrency(row?.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          {row?.remark} - {fCurrency(row?.amount)}
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>
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
                        <TableCell align="right">{fDateTime(row?.createdAt)}</TableCell>

                        <TableCell align="right">
                          {row?.transactionType === 'in' ? (
                            <Box
                              component={Icon}
                              sx={{ color: 'green', fontSize: '24px' }}
                              color="success"
                              icon={arrowDown}
                            />
                          ) : (
                            <Box sx={{ color: 'red', fontSize: '24px' }} component={Icon} size="40px" icon={arrowUp} />
                          )}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transaction.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Card>
      </Container>
    </Page>
  );
}
