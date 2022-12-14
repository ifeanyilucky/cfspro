import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@mui/material/styles';
import editIcon from '@iconify/icons-eva/edit-2-fill';
import saveIcon from '@iconify/icons-ant-design/save';
import {
  Box,
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  Checkbox,
  IconButton,
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
import { fCurrency, fPercent } from '../../utils/formatNumber';
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
import { getStaticInvestments } from 'src/redux/slices/investment';
import DepositDetail from 'src/components/_dashboard/admin/withdrawal-detail';
import * as api from 'src/utils/axios';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'dateCreated', label: 'Date', alignRight: false },
  { id: 'planName', label: 'Plan name', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'dailyInterest', label: 'Daily interest', alignRight: false },
  { id: 'totalReturn', label: 'Total return', alignRight: false },
  { id: 'remainingDays', label: 'Days left', alignRight: false },
  { id: 'interest', label: 'Interest', alignRight: true },
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

export default function Investment() {
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
    dispatch(getStaticInvestments());
  }, [dispatch]);
  const { investments } = useSelector((state) => state.investment);
  console.log(investments);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = investments.map((n) => n._id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - investments.length) : 0;

  const filteredInvestments = applySortFilter(investments, getComparator(order, orderBy), filterName);

  const isProductNotFound = investments.length === 0;

  const getNumberOfDays = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    const oneDay = 1000 * 60 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  };

  const [isEdit, setEdit] = useState(false);
  const [interest, setInterest] = useState('');
  const updateInvestment = async (id, values) => {
    try {
      await api.updateStaticInvestment(id, values);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title="Account history">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User investments"
          links={[
            { name: 'Dashboard', href: PATH_ADMIN.overview },
            {
              name: 'User investments'
            }
          ]}
        />
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={investments.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {investments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log(getNumberOfDays(row?.createdAt, row?.expiryDate));
                    return (
                      <TableRow hover key={row?._id} tabIndex={-1}>
                        <TableCell>{row?.createdAt && fDateTime(row?.createdAt)}</TableCell>
                        <TableCell>{row?.plan?.name && row?.plan?.name}</TableCell>
                        <TableCell>
                          {row?.user?.firstName} {row?.user?.lastName}
                        </TableCell>
                        <TableCell>
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
                        <TableCell padding="checkbox" component="th" scope="row">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {row?.plan?.dailyInterest && fPercent(row?.plan?.dailyInterest)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell padding="checkbox" component="th" scope="row">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {row?.plan?.totalReturn && fPercent(row?.plan?.totalReturn)}
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
                              {getNumberOfDays(row?.createdAt, row?.expiryDate)} days left
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {isEdit ? (
                              <input
                                type="number"
                                defaultValue={row?.interest}
                                onChange={(e) => {
                                  setInterest(e.target.value);
                                }}
                              />
                            ) : (
                              fCurrency(row?.interest)
                            )}
                            <Button
                              onClick={() => {
                                if (isEdit === true) {
                                  updateInvestment(row?._id, { interest });
                                } else {
                                  setEdit(true);
                                }
                              }}
                            >
                              {isEdit ? 'Save' : 'Edit'}
                            </Button>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {row?.investmentStatus === 'completed' ? (
                            <Typography variant="subtitle2" sx={{ color: 'green' }}>
                              {row?.investmentStatus}
                            </Typography>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => updateInvestment(row?._id, { investmentStatus: 'completed' })}
                            >
                              Complete investment
                            </Button>
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
            rowsPerPageOptions={[]}
            component="div"
            count={investments.length}
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
