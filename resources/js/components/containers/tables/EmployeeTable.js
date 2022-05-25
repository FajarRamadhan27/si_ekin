import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CheckIcon from '@mui/icons-material/Check';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InsertEmployeeModal from '../../modals/InsertEmployeeModal';
import {Button } from '@mui/material';
import Loading from '../Loading';
import { employeeActiveYn, getEmployees } from '../../../utils/Axios';
import EnhancedTableToolbar from './base/EnhancedTableToolbar';
import { useDispatch } from 'react-redux';
import { setHeadCell, setSelectedRow } from '../../../redux/reducers/TableSlice';
import EnhancedTableHead from './base/EnhancedTableHead';

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Nama',
  },
  {
    id: 'no_telp',
    numeric: true,
    disablePadding: false,
    label: 'No Telp',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'jabatan',
    numeric: true,
    disablePadding: false,
    label: 'Jabatan',
  },
  {
    id: 'aktifYn',
    numeric: false,
    disablePadding: false,
    label: 'Aktif Y/N',
  },
  {
    id: 'row_edit',
    numeric: true,
    disablePadding: false,
    label: 'Edit',
  },
];

export default function EmployeeTable(props) {

  const dispatch = useDispatch()

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [inputModal, setInputModal] = React.useState(false)
  const [employees, setEmployee] = React.useState(null)
  const [flashMessage, setFlashMessage] = React.useState(null)
  const [isFiltered, setFilter] = React.useState(false)

  dispatch(setHeadCell(headCells))

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = employees.forFilter.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleActiveYnClicked = (event, userId) => {
        event.stopPropagation()
        employeeActiveYn(userId, () => {
            setFlashMessage('Status aktivasi user berhasil diperbaharui.')
            getEmployees(setEmployee)
        })
    }

    React.useEffect(() => {
        getEmployees(setEmployee)
    }, [])

    if (!employees) {
        return <Loading uiAttr={{ open: employees === null }}/>
    }

  const handleClick = (event, name) => {
      event.preventDefault()
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const handleButtonEditRow = (event, row) => {
      event.stopPropagation()
      setInputModal(true)
      dispatch(setSelectedRow(row))
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
            uiAttr={{
                numSelected: selected.length,
                setInputModal,
                flashMessage,
                setFlashMessage,
                selected,
                setSelected,
                employees,
                setEmployee,
                setFilter
            }}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={isFiltered ? employees.forFilter.length : employees.original.length}
            />
            <TableBody>
              {stableSort(isFiltered ? employees.forFilter : employees.original, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.no_telp}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.jabatan}</TableCell>
                      <TableCell>
                          {
                              row.aktif_yn &&
                                <>
                                  <Button
                                    id='btn-showYn'
                                    onClick={(event) => handleActiveYnClicked(event, row.id)}
                                  >
                                    <CheckIcon fontSize='small' sx={{ color: row.aktif_yn === 'Y' ? 'green' : 'gray' }}/>
                                  </Button>
                                  { row.aktif_yn === 'Y' ? 'YA' : 'TIDAK' }
                                </>
                          }
                      </TableCell>
                      <TableCell>
                        <Button
                            onClick={(event) => handleButtonEditRow(event, row)}
                            variant="contained"
                            size='small'
                        >
                            Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={isFiltered ? employees.forFilter.length : employees.original.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      { inputModal && <InsertEmployeeModal uiAttr={{ inputModal, setInputModal, setEmployee, setFlashMessage, setSelected }}/> }
    </Box>
  );
}
