import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-eva/edit-2-fill';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, removeUser, updateUser } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';
import { fCurrency } from 'src/utils/formatNumber';
import EditUserDialog from 'src/components/_dashboard/admin/edit-user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: 'No.', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'balance', label: 'Balance', alignRight: false },
  { id: 'Profit', label: 'Profit', alignRight: false },
  { id: 'ReferralBonus', label: 'Referral Bonus', alignRight: false },
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
  if (query) {
    return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteUser = (userId) => {
    dispatch(removeUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isUserNotFound = userList.length === 0;
  // user dialog
  const [currentUser, setCurrentUser] = useState(null);
  const [userOpen, setUserOpen] = useState(false);

  // edit cash
  const [amount, setAmount] = useState({
    totalProfit: 0,
    referralBonus: 0,
    accountBalance: 0
  });
  const [balanceEdit, setBalanceEdit] = useState(false);
  const [profitEdit, setProfitEdit] = useState(false);
  const [referralBonusEdit, setReferralBonusEdit] = useState(false);

  const handleBalanceEdit = async (value) => {
    // dispatch(updateUser(value));
    console.log(value);
    setProfitEdit(false);
    setBalanceEdit(false);
    setReferralBonusEdit(false);
  };

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[{ name: 'Dashboard', href: PATH_ADMIN.root }, { name: 'List' }]}
        />
        <EditUserDialog open={userOpen} setOpen={setUserOpen} user={currentUser} />
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    if (row.role === 'customer') {
                      return (
                        <TableRow hover key={row?._id} tabIndex={-1}>
                          <TableCell padding="checkbox">{index + 1}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar>{row?.firstName}</Avatar>
                              <Typography variant="subtitle2" noWrap>
                                {row?.firstName && row?.firstName} {row?.lastName && row?.lastName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row?.email && row?.email}</TableCell>
                          <TableCell align="left">
                            <Typography variant="body1">
                              {row?.accountBalance && fCurrency(row?.accountBalance)}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1">{row?.totalProfit && fCurrency(row?.totalProfit)}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Stack spacing={2} direction="row" alignItems="center">
                              <Typography variant="body1">
                                {row?.referralBonus && fCurrency(row?.referralBonus)}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              handleEdit={() => {
                                navigate(`${PATH_ADMIN.allUser}/${row?._id}`);
                              }}
                              onDelete={() => handleDeleteUser(row?._id)}
                              userName={row?.firstName && row?.lastName}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
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
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
