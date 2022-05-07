import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Divider, Grid, TextField } from '@mui/material';
import { createEmployee, getEmployees, updateEmployee } from '../../utils/Axios';

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

export default function InsertEmployeeModal(props) {

  const [errorMessage, setError] = React.useState();

  const { inputModal, setInputModal, setEmployee, setFlashMessage, editedRow, setSelected, setEditedRow } = props.uiAttr

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let email = data.get('email')
    let name = data.get('name')
    let jabatan = data.get('jabatan')
    let no_telp = data.get('no_telp')

    if (editedRow) {
        if (email === editedRow.email && name === editedRow.name && editedRow.jabatan === jabatan && no_telp === editedRow.no_telp) {
            setError({ status: false, messages: {email : ['Tidak ada data yang dirubah'] }})
            return
        }
        updateEmployee({email, name, jabatan, no_telp}, editedRow.id, (response) => {
            const { status } = response.data

            if (status === true) {
                setInputModal(false)
                setError(response.data)
                getEmployees(setEmployee)
                setSelected([])
                setFlashMessage('Data Berhasil diperbarui...')
                setEditedRow(null)
            } else {
                setError(response.data)
            }
        })
    } else {
        createEmployee({email, name, jabatan, no_telp}, setInputModal, setEmployee, setError, setFlashMessage)
    }
  }

  return (
    <div>
      <Modal
        open={inputModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Input Karyawan
          </Typography>
          <Divider/>
          {
            errorMessage?.status === false ?
                <Alert severity="warning" sx={{ mt: 2}}>
                    <Typography>
                        {errorMessage.messages['email']}
                    </Typography>
                    <Typography>
                        {errorMessage.messages['name']}
                    </Typography>
                    <Typography>
                        {errorMessage.messages['jabatan']}
                    </Typography>
                    <Typography>
                        {errorMessage.messages['no_telp']}
                    </Typography>
                </Alert>
            : null
          }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Nama"
                    fullWidth
                    value={ editedRow?.name }
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="no_telp"
                    name="no_telp"
                    label="Nomor Telepon"
                    fullWidth
                    value={ editedRow?.no_telp }
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    value={ editedRow?.email }
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="jabatan"
                    name="jabatan"
                    label="Jabatan"
                    fullWidth
                    value={ editedRow?.jabatan }
                />
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color='error'
                    sx={{ mt: 3, mb: 2, mr: 1 }}
                    onClick={() => setInputModal(false)}
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
