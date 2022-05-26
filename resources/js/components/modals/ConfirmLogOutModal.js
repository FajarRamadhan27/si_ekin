import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { setUser } from '../../redux/reducers/userSlice'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmLogOutModal(props) {

  const dispatch = useDispatch()
  const { logOutModal, setModalLogOut, setToken} = props.uiAttr

  const handleLogout = () => {
    dispatch(setUser(null))
    setToken(null)
    localStorage.clear('jwtToken')
    localStorage.clear('user')
  }

  return (
      <Modal
        open={logOutModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ErrorOutlineIcon color='error' sx={{ fontSize: 40 , mr: 1}}/>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Apakah anda ingin Logout ?
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color='error'
                    sx={{ mt: 3, mb: 2, mr: 1 }}
                    onClick={() => setModalLogOut(false)}
                >
                    Tidak
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, minWidth: 90 }}
                    onClick={handleLogout}
                >
                    Ya
                </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
  );
}
