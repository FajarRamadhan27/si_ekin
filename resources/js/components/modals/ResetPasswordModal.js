import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { resetPassword } from '../../utils/Axios';
import { Alert, Divider, Grid, TextField } from '@mui/material';

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

export default function ResetPasswordModal(props) {

  const [errorMessage, setError] = React.useState({
      status: true,
      messages: null
  })

  const { modalResetPassword, setModal, setFlashMessage } = props.uiAttr

  const handleSubmit = (event) => {

    event.preventDefault()

    const data = new FormData(event.currentTarget);

    let oldPassword = data.get('oldPassword')
    let newPassword = data.get('newPassword')
    let confirmPassword = data.get('confirmPassword')

    if (oldPassword === newPassword) {
        setError({
            status: false,
            messages: 'Password baru tidak boleh sama dengan password sebelumnya!'
        })

        return
    }

    if (newPassword != confirmPassword) {
        setError({
            status: false,
            messages: 'Password baru tidak sesuai dengan konfirmasi!'
        })

        return
    }

    if (newPassword.length < 6) {
        setError({
            status: false,
            messages: 'Password minimal 6 digit!'
        })

        return
    }

  resetPassword(setError, setModal, setFlashMessage,{oldPassword, newPassword})

    setError({
        status: true,
        messages: null
    })
  }

  return (
    <div>
      <Modal
        open={modalResetPassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ganti Password
          </Typography>
          <Divider/>
          {
            !errorMessage.status &&
                <Alert severity="warning" sx={{ mt: 2}}>
                    <Typography>
                        {errorMessage.messages}
                    </Typography>
                </Alert>
          }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="oldPassword"
                    name="oldPassword"
                    label="Password Lama"
                    fullWidth
                    type='password'
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="newPassword"
                    name="newPassword"
                    label="Password Baru"
                    type='password'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Konfirmasi Password"
                    type='password'
                    fullWidth
                />
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color='error'
                    onClick={() => setModal(false)}
                    sx={{ mt: 3, mb: 2, mr: 1 }}
                >
                    Batal
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Simpan
                </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
