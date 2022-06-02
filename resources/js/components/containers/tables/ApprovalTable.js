import moment from 'moment';
import Search from '../Search';
import * as React from 'react';
import Loading from '../Loading';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import { visuallyHidden } from '@mui/utils';
import { DatePicker } from '@mui/x-date-pickers';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import InsertEmployeeModal from '../../modals/InsertEmployeeModal';
import { approveYn, deleteEmployee, getApproval} from '../../../utils/Axios';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const DatePickerCustom = styled(DatePicker)(({ theme }) =>({
   '& .MuiOutlinedInput-input': {
        backgroundColor: 'aqua'
   }
}))

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
    id: 'tanggal',
    numeric: false,
    disablePadding: false,
    label: 'Tanggal',
  },
  {
    id: 'nama',
    numeric: false,
    disablePadding: false,
    label: 'Nama',
  },
  {
    id: 'karakter',
    numeric: true,
    disablePadding: false,
    label: 'Karakter',
  },
  {
    id: 'absensi',
    numeric: true,
    disablePadding: false,
    label: 'Absensi',
  },
  {
    id: 'teamwork',
    numeric: true,
    disablePadding: false,
    label: 'Teamwork',
  },
  {
    id: 'pencapaian',
    numeric: true,
    disablePadding: false,
    label: 'Pencapaian',
  },
  {
    id: 'loyalitas',
    numeric: true,
    disablePadding: false,
    label: 'Loyalitas',
  },
  {
    id: 'efisiensi',
    numeric: true,
    disablePadding: false,
    label: 'Efisiensi',
  },
  {
    id: 'nilai_akhir',
    numeric: true,
    disablePadding: false,
    label: 'Nilai Akhir',
  },
  {
    id: 'catatan',
    numeric: false,
    disablePadding: false,
    label: 'Catatan',
  },
  {
    id: 'approve_yn',
    numeric: false,
    disablePadding: false,
    label: 'Approve Y/N',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ bgcolor: '#B2B1B9'}}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {

  const { setInputModal, numSelected, flashMessage, setFlashMessage, selected, assessments, setAssessment, setSelected, setFilter } = props.uiAttr

  if (flashMessage.type) {
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setFlashMessage({ type: null, message: null})
        }, 3000)

        return () => clearTimeout(timeout)
    }, [flashMessage])
  }

  const handleDelete = () => {
    deleteEmployee(selected, setAssessment, setFlashMessage, setSelected)
  }

  return (
    <>
        { flashMessage.type ? <Alert severity={flashMessage.type} >{ flashMessage.message }</Alert> : null }
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                display: 'flex',
                justifyContent: 'space-between',
                justifyItems: 'center'
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Search sx={{ background: '#DCDCDC' }} data={{ data: assessments, setData: setAssessment, setFilter }}/>
            )}

            {numSelected > 0 ? (
                <Tooltip onClick={handleDelete} title="Delete">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Input Karyawan">
                <IconButton onClick={() => setInputModal(true)}>
                    <DriveFileRenameOutlineIcon/>
                </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ApprovalTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [inputModal, setInputModal] = React.useState(false)
  const [assessments, setAssessment] = React.useState(null)
  const [flashMessage, setFlashMessage] = React.useState({ type: null, message: null})
  const [editedRow, setEditedRow] = React.useState(null)
  const [isFiltered, setFilter] = React.useState(false)
  const [value, setValue] = React.useState(moment(new Date()))

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = assessments.forFilter.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    React.useEffect(() => {
        getApproval(setAssessment,value.format('YYYYMM'))
    }, [])

    if (!assessments) {
        return <Loading uiAttr={{ open: assessments === null }}/>
    }

  const handleClick = (event, name) => {
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

  const handleButtonApproveYn = (event, assessment) => {
    event.stopPropagation()

    const { approve_yn, id } = assessment

    approveYn(
        setFlashMessage,
        { id, approveYn : approve_yn === 'Y' ? 'N' : 'Y' },
        setAssessment,
        value.format('YYYYMM')
    )
  }

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assessments.length) : 0;

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
                assessments,
                setAssessment,
                setFilter
            }}
        />
        <div className='flex mx-4 my-6 items-center justify-end text-sm '>
            <DatePickerCustom
                wrapperClassName="date-picker"
                views={['year', 'month']}
                label="Pilih Periode"
                minDate={moment(new Date('2022-01-01'))}
                maxDate={moment(new Date('2025-12-31'))}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue)
                    getApproval(setAssessment, newValue.format('YYYYMM'))
                }}
                renderInput={(params) => <TextField {...params} helperText={null} />}
            />
        </div>
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
              rowCount={isFiltered ? assessments.forFilter.length : assessments.original.length}
            />
            <TableBody>
              {stableSort(isFiltered ? assessments.forFilter : assessments.original, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      onClick={(event) => handleClick(event, row.id)}
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
                        {row.tanggal}
                      </TableCell>
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.karakter}</TableCell>
                      <TableCell >{row.absensi}</TableCell>
                      <TableCell >{row.teamwork}</TableCell>
                      <TableCell >{row.pencapaian}</TableCell>
                      <TableCell >{row.loyalitas}</TableCell>
                      <TableCell >{row.efisiensi}</TableCell>
                      <TableCell >{row.nilai_akhir}</TableCell>
                      <TableCell >{row.catatan}</TableCell>
                      <TableCell>
                        <>
                            <Button
                            id='btn-showYn'
                            onClick={(event) => handleButtonApproveYn(event, row)}
                            >
                            <CheckIcon fontSize='small' sx={{ color: row.approve_yn === 'Y' ? 'green' : 'gray' }}/>
                            </Button>
                            { row.approve_yn === 'Y' ? 'YA' : 'TIDAK' }
                        </>
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
          count={isFiltered ? assessments.forFilter.length : assessments.original.length}
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
      { inputModal ? <InsertEmployeeModal uiAttr={{ inputModal, setInputModal, setAssessment, setFlashMessage, editedRow, setSelected, setEditedRow }}/> : null }
    </Box>
  );
}
