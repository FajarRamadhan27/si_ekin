import moment from 'moment';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { DatePicker } from '@mui/x-date-pickers';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { kpiIndex } from '../../../helpers/constant';
import FindUserModal from '../../modals/FindUserModal';
import InputAssessmentNote from '../InputAssessmentNote';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Alert, Radio, RadioGroup, TextareaAutosize, TextField } from '@mui/material';
import { assessmentShowYn, deleteAssessment, deleteEmployee, getUserAssessmentByPeriod } from '../../../utils/Axios';

const DatePickerCustom = styled(DatePicker)(({ theme }) =>({
   '& .MuiOutlinedInput-input': {
        backgroundColor: 'aqua'
   }
}))

const headCells = [
  {
    id: 'kpi',
    numeric: false,
    disablePadding: false,
    label: 'KPI',
  },
  {
    id: 'catatan',
    numeric: false,
    disablePadding: false,
    label: 'Catatan',
  },
  {
    id: 'nilai',
    numeric: true,
    disablePadding: false,
    label: 'Nilai',
  }
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

  const { setInputModal, numSelected, flashMessage, setFlashMessage, assessments, setAssessment, employee, value } = props.uiAttr

  if (flashMessage.type) {
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setFlashMessage({ type: null, message: null})
        }, 3000)

        return () => clearTimeout(timeout)
    }, [flashMessage])
  }

  const handleDelete = () => {
    deleteAssessment(setFlashMessage, setAssessment, employee.ID,value.format('YYYYMM'), assessments.penilaian_id)
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
                justifyContent: 'end',
                justifyItems: 'center'
            }}
        >
            {
                assessments.penilaian_id &&
                    <Tooltip onClick={handleDelete} title="Hapus Penilaian">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
            }
            <Tooltip title="Simpan Penilaian">
                <IconButton onClick={() => setInputModal(true)}>
                    <DriveFileRenameOutlineIcon/>
                </IconButton>
            </Tooltip>
        </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AssessmentInputTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [inputModal, setInputModal] = React.useState(false)
  const [assessments, setAssessment] = React.useState({ id: null, approve_yn: null, karakter: null, absensi: null, teamwork: null, pencapaian: null, loyalitas: null, efisiensi: null})
  const [flashMessage, setFlashMessage] = React.useState({ type: null, message: null})
  const [employee, setEmployee] = React.useState(null)
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue)
    if (employee) {
      getUserAssessmentByPeriod(setAssessment,employee.ID,newValue.format('YYYYMM'))
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, pb: 4 }}>
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
                setFilter,
                employee,
                value
            }}
        />
        <div className='flex m-4 items-center justify-between text-sm '>
            <div className='flex items-center'>
                <TextField
                    label='Karyawan'
                    onClick={() => setInputModal(true)}
                    value={employee?.NAME}
                    InputLabelProps={{ shrink: true }}
                />
                {/* <IconButton sx={{ ml: 2}}>
                    <SearchIcon/>
                </IconButton> */}
            </div>
            <DatePickerCustom
                wrapperClassName="date-picker"
                views={['year', 'month']}
                label="Pilih Periode"
                minDate={moment(new Date('2022-01-01'))}
                maxDate={moment(new Date('2025-12-31'))}
                value={value}
                onChange={(newValue) => handleDateChange(newValue)}
                renderInput={(params) => <TextField {...params} helperText={null} />}
            />
        </div>
        <div className='m-4'>
            <TextareaAutosize
                aria-label="empty textarea"
                minRows={3}
                placeholder="Masukan catatan disni..."
                style={{ width: "100%", borderWidth: "1px", padding: 2 }}
            />
        </div>
        {
          employee &&
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
              />
              <TableBody>
                {
                    kpiIndex.map(index => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index.key}
                            >
                                <TableCell>{index.label}</TableCell>
                                <TableCell>
                                    <InputAssessmentNote/>
                                </TableCell>
                                <TableCell>
                                    <RadioGroup
                                        row
                                        key={assessments.id}
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={assessments[index.key]}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="1" disabled={assessments.approve_yn === 'Y'}/>
                                        <FormControlLabel value="2" control={<Radio />} label="2" disabled={assessments.approve_yn === 'Y'}/>
                                        <FormControlLabel value="3" control={<Radio />} label="3" disabled={assessments.approve_yn === 'Y'}/>
                                        <FormControlLabel value="4" control={<Radio />} label="4" disabled={assessments.approve_yn === 'Y'}/>
                                        <FormControlLabel value="5" control={<Radio />} label="5" disabled={assessments.approve_yn === 'Y'}/>
                                    </RadioGroup>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      { inputModal && <FindUserModal uiAttr={{ inputModal, setInputModal, setEmployee, setAssessment, value }}/> }
    </Box>
  );
}
