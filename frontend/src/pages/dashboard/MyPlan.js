import {
  Typography,
  Container,
  Button,
  Card,
  TableCell,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  Box,
  TablePagination
} from '@mui/material';
import { Icon } from '@iconify/react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../../components/Page';
import { getAllInvestments } from 'src/redux/slices/investment';
import { useDispatch, useSelector } from 'src/redux/store';
import { useEffect, useState } from 'react';
import useSettings from 'src/hooks/useSettings';
import Scrollbar from 'src/components/Scrollbar';
import { ProductListToolbar, ProductListHead } from 'src/components/_dashboard/e-commerce/product-list';
import SearchNotFound from 'src/components/SearchNotFound';
import { fCurrency, fPercent } from 'src/utils/formatNumber';
import { fDateTime } from 'src/utils/formatTime';
import { sentenceCase } from 'change-case';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'investmentsId', label: 'investments ID', alignRight: false },
  { id: 'package', label: 'Package', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'interest', label: 'Interest($)', alignRight: false },
  { id: 'dateCreated', label: 'Date', alignRight: true }
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

export default function MyPlan() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getAllInvestments());
  }, []);
  const { investments } = useSelector((state) => state.investment);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - investments.length) : 0;

  const filteredInvestment = applySortFilter(investments, getComparator(order, orderBy), filterName);
  const isProductNotFound = filteredInvestment.length === 0;
  console.log(investments);
  return (
    <Page title="My Plan">
      <Container>
        <HeaderBreadcrumbs
          heading="My plan"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.app }, { name: 'My plan' }]}
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
                        <TableCell style={{ minWidth: 160 }}>{row?.plan?.name}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          <Typography variant="body1">{fCurrency(row?.amount)}</Typography>
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
                        <TableCell align="right">{row?.interest && fCurrency(row?.interest)}</TableCell>
                        <TableCell align="right">{fDateTime(row?.createdAt)}</TableCell>
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
            count={investments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Card>
        {/* {!plan ? (
          <Typography variant="subtitle1">
            You do not have an investment plan at the moment or no value match your query.
          </Typography>
        ) : (
          ''
        )} */}
      </Container>
    </Page>
  );
}
