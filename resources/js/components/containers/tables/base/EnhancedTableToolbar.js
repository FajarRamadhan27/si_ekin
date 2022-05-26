
import { useEffect } from 'react'
import Search from '../../Search'
import PropTypes from 'prop-types'
import { Alert } from '@mui/material'
import { useDispatch } from 'react-redux';
import Tooltip from '@mui/material/Tooltip'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteEmployee } from '../../../../utils/Axios'
import { setSelectedRow } from '../../../../redux/reducers/TableSlice';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

const EnhancedTableToolbar = (props) => {

    const dispatch = useDispatch()
    const { setInputModal, numSelected, flashMessage, setFlashMessage, selected, employees, setEmployee, setSelected, setFilter } = props.uiAttr

    if (setFlashMessage) {
        useEffect(() => {
          const timeout = setTimeout(() => {
              setFlashMessage(null)
          }, 2000)

          return () => clearTimeout(timeout)
      }, [])
    }

    const handleDelete = () => {
      deleteEmployee(selected, setEmployee, setFlashMessage, setSelected)
    }

    const handleInputBtnClicked = (event) => {
        setInputModal(true)
        dispatch(setSelectedRow(null))
    }

    return (
      <>
          { flashMessage ? <Alert severity="success" >{ flashMessage }</Alert> : null }
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
                  <Search sx={{ background: '#DCDCDC' }} data={{ data: employees, setData: setEmployee, setFilter }}/>
              )}

              {numSelected > 0 ? (
                  <Tooltip onClick={handleDelete} title="Delete">
                  <IconButton>
                      <DeleteIcon />
                  </IconButton>
                  </Tooltip>
              ) : (
                  <Tooltip title="Input Karyawan">
                  <IconButton onClick={handleInputBtnClicked}>
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
  }

  export default EnhancedTableToolbar
