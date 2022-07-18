import Search from '../Search';
import * as React from 'react';
import Loading from '../Loading';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import { Alert } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import InsertEmployeeModal from '../../modals/InsertEmployeeModal';
import { bulkShowAssessments, getkpiCosistencyRatio, getKpiIndex, getKpiNormalization, getKpiRowSummary } from '../../../utils/Axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { kpiIndex } from '../../../helpers/constant';
import { NineK } from '@mui/icons-material';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function EnhancedTableHead(props) {

  const { type } = props

  return (
    <TableHead sx={{ bgcolor: '#B2B1B9'}}>
      <TableRow>
        <TableCell
            key={"cross"}
            align={'left'}
            padding={'normal'}
        >
            {" "}
        </TableCell>
        {
            ['default', 'normalization', 'row_summary'].includes(type) &&
            kpiIndex.map(kpi => {
                return (
                    <TableCell
                        key={kpi.key}
                        align={'left'}
                        padding={'normal'}
                    >
                        {kpi.label}
                    </TableCell>
                )
            })
        }
        {
            ['normalization', 'row_summary'].includes(type) &&
            <>
                <TableCell
                    key={'jumlah'}
                    align={'left'}
                    padding={'normal'}
                >
                    Jumlah
                </TableCell>
            </>
        }
        {
            ['consistency_ratio'].includes(type) &&
            <>
                <TableCell
                    key={'prioritas'}
                    align={'left'}
                    padding={'normal'}
                >
                    Jumlah /Pairs
                </TableCell>
            </>
        }
        {
            ['normalization', 'consistency_ratio'].includes(type) &&
            <>
                <TableCell
                    key={'prioritas'}
                    align={'left'}
                    padding={'normal'}
                >
                    Prioritas
                </TableCell>
            </>
        }
        {
            ['consistency_ratio'].includes(type) &&
            <>
                <TableCell
                    key={'prioritas'}
                    align={'left'}
                    padding={'normal'}
                >
                    Hasil
                </TableCell>
            </>
        }
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

  const { setInputModal, numSelected, flashMessage, setFlashMessage, selected, assessments, setAssessment, setSelected, setFilter, period } = props.uiAttr

  if (flashMessage.type) {
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setFlashMessage({ type: null, message: null})
        }, 3000)

        return () => clearTimeout(timeout)
    }, [flashMessage])
  }

  const handleDelete = () => {
      bulkShowAssessments(selected, setAssessment, setFlashMessage, setSelected, period)
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
            {
                numSelected > 0 && (
                    <Tooltip onClick={handleDelete} title="Show Assessments">
                    <IconButton>
                        <VisibilityIcon />
                    </IconButton>
                    </Tooltip>
                )
            }
        </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AHPTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [inputModal, setInputModal] = React.useState(false)
  const [assessments, setAssessment] = React.useState(null)
  const [flashMessage, setFlashMessage] = React.useState({ type: null, message: null})
  const [editedRow, setEditedRow] = React.useState(null)
  const [isFiltered, setFilter] = React.useState(false)
  const [value, setValue] = React.useState(moment(new Date()))
  const [normalization, setNotmalization] = React.useState()
  const [rowSummary, setRowSummary] = React.useState()
  const [consistencyRatio, setConsistencyRatio] = React.useState()

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
        getKpiIndex(setAssessment)
        getKpiNormalization(setNotmalization)
        getKpiRowSummary(setRowSummary)
        getkpiCosistencyRatio(setConsistencyRatio)
    }, [])

    if (!assessments || !normalization || !rowSummary || !consistencyRatio) {
        return <Loading uiAttr={{ open: assessments === null }}/>
    }

    let jumlah = consistencyRatio[6].Hasil
    let nKpi = 6
    let lamdaMax = jumlah / nKpi
    let ci = (lamdaMax - nKpi) / nKpi - 1
    let cr = ci / 1.24

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

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
                setFilter,
                period: value.format('YYYYMM')
            }}
        />
        <div className='flex p-4 w-full'>
            <div className='w-[50%] border border-gray-500 p-4'>
                <Typography
                    sx={{ flex: '1 1 100%', mb: 1 }}
                    variant="body1"
                    id="tableTitle"
                    component="div"
                >
                    1. Matrix Perbandingan berpasangan
                </Typography>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            type={'default'}
                        />
                        <TableBody>
                            {
                                assessments.map(kpi => {
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={kpi.LABEL}
                                            >
                                                <TableCell>{kpi.LABEL}</TableCell>
                                                <TableCell align='right'>{kpi.Karakter}</TableCell>
                                                <TableCell align='right'>{kpi.Absensi}</TableCell>
                                                <TableCell align='right'>{kpi.Teamwork}</TableCell>
                                                <TableCell align='right'>{kpi.Pencapaian}</TableCell>
                                                <TableCell align='right'>{kpi.Loyalitas}</TableCell>
                                                <TableCell align='right'>{kpi.Efisiensi}</TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='ml-8 w-[50%]  border border-gray-500 p-4'>
               {
                   normalization &&
                   <>
                        <Typography
                            sx={{ flex: '1 1 100%', mb: 1 }}
                            variant="body1"
                            id="tableTitle"
                            component="div"
                        >
                            2. Matrix Nilai Kriteria (Normalisasi)
                        </Typography>
                        <TableContainer>
                            <Table
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    type={'normalization'}
                                />
                                <TableBody>
                                    {
                                        normalization.map(kpi => {
                                            return (
                                                <>
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={kpi.LABEL}
                                                    >
                                                        <TableCell>{kpi.LABEL}</TableCell>
                                                        <TableCell align='right'>{kpi.Karakter}</TableCell>
                                                        <TableCell align='right'>{kpi.Absensi}</TableCell>
                                                        <TableCell align='right'>{kpi.Teamwork}</TableCell>
                                                        <TableCell align='right'>{kpi.Pencapaian}</TableCell>
                                                        <TableCell align='right'>{kpi.Loyalitas}</TableCell>
                                                        <TableCell align='right'>{kpi.Efisiensi}</TableCell>
                                                        <TableCell align='right'>{kpi.Jumlah}</TableCell>
                                                        <TableCell align='right'>{kpi.Prioritas}</TableCell>
                                                    </TableRow>
                                                </>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                   </>
               }
            </div>
        </div>
        <div className='flex p-4 w-full'>
            <div className='w-[50%] border border-gray-500 p-4'>
                <Typography
                    sx={{ flex: '1 1 100%', mb: 1 }}
                    variant="body1"
                    id="tableTitle"
                    component="div"
                >
                    3. Matrix Penjumlahan setiap baris
                </Typography>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            type={'row_summary'}
                        />
                        <TableBody>
                            {
                                rowSummary.map(kpi => {
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={kpi.LABEL}
                                            >
                                                <TableCell>{kpi.LABEL}</TableCell>
                                                <TableCell align='right'>{kpi.Karakter}</TableCell>
                                                <TableCell align='right'>{kpi.Absensi}</TableCell>
                                                <TableCell align='right'>{kpi.Teamwork}</TableCell>
                                                <TableCell align='right'>{kpi.Pencapaian}</TableCell>
                                                <TableCell align='right'>{kpi.Loyalitas}</TableCell>
                                                <TableCell align='right'>{kpi.Efisiensi}</TableCell>
                                                <TableCell align='right'>{kpi.Jumlah}</TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='flex ml-8 w-[50%] border border-gray-500 p-4'>
               {
                   consistencyRatio &&
                   <>
                        <div>
                            <Typography
                                sx={{ flex: '1 1 100%', mb: 1 }}
                                variant="body1"
                                id="tableTitle"
                                component="div"
                            >
                                4. Perhitungan Rasio Konsistensi
                            </Typography>
                            <TableContainer>
                                <Table
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        type={'consistency_ratio'}
                                    />
                                    <TableBody>
                                        {
                                            consistencyRatio.map(kpi => {
                                                return (
                                                    <>
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={kpi.LABEL}
                                                        >
                                                            <TableCell>{kpi.LABEL}</TableCell>
                                                            <TableCell align='right'>{kpi.Jumlah}</TableCell>
                                                            <TableCell align='right'>{kpi.Prioritas}</TableCell>
                                                            <TableCell align='right'>{kpi.Hasil}</TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className='ml-14 mt-5'>
                            <div> {`Jumlah : ${jumlah}`} </div>
                            <div> {`nKPI : ${nKpi}`} </div>
                            <div> {`Lamda Max : ${jumlah} / ${nKpi} = ${lamdaMax.toFixed(3)}`} </div>
                            <div> {`CI : ( ${lamdaMax.toFixed(3)} - ${nKpi} ) / ( ${nKpi} - 1) = ${ci.toFixed(3)}`} </div>
                            <div> {`CR : ${ci.toFixed(2)} / 1.24 = ${cr.toFixed(3)}`} </div>
                            <div> {`Konsisten : ${cr <= 0.1} `} </div>
                        </div>
                   </>
               }
            </div>
        </div>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      { inputModal ? <InsertEmployeeModal uiAttr={{ inputModal, setInputModal, setAssessment, setFlashMessage, editedRow, setSelected, setEditedRow }}/> : null }
    </Box>
  );
}
