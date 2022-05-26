import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { positions } from '../../helpers/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRow } from '../../redux/reducers/TableSlice';
import { Alert, Autocomplete, Divider, Grid, TextField } from '@mui/material';
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

  const dispatch = useDispatch()
  const { selectedRow } = useSelector(state => state.table)
  const [errorMessage, setError] = React.useState();
  const [newVal, setNewVal] = React.useState(selectedRow)

  const { inputModal, setInputModal, setEmployee, setFlashMessage, setSelected } = props.uiAttr

  const handleSubmit = (event) => {
    event.preventDefault();


    if (selectedRow) {
        let identic = true;

        for (const key in selectedRow) {
            if(selectedRow[key] !== newVal[key]) {
                identic = false
                break;
            }
        }

        if (identic) {
            setError({ status: false, messages: {email : ['Tidak ada data yang dirubah'] }})
            return
        }

        updateEmployee(newVal, selectedRow.id, (response) => {
            const { status } = response.data

            if (status === true) {
                setInputModal(false)
                setError(response.data)
                getEmployees(setEmployee)
                setSelected([])
                setFlashMessage('Data Berhasil diperbarui...')
                dispatch(setSelectedRow(null))
            } else {
                setError(response.data)
            }
        })
    } else {
        createEmployee({email, name, jabatan, no_telp}, setInputModal, setEmployee, setError, setFlashMessage)
    }
  }

  const handleTextChange = (event, key) => {
    const { [key]:changedVal, ...rest} = newVal
    setNewVal({ [key]:event.target.value, ...rest})
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
                    value={ newVal?.name }
                    onChange={(event) => {handleTextChange(event, 'name')}}
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="no_telp"
                    name="no_telp"
                    label="Nomor Telepon"
                    fullWidth
                    value={ newVal?.no_telp }
                    onChange={(event) => {handleTextChange(event, 'no_telp')}}
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    value={ newVal?.email }
                    onChange={(event) => {handleTextChange(event, 'email')}}
                />
            </Grid>
            <Grid item xs={12} mt={2}>
                <Autocomplete
                    disablePortal
                    id="jabatan"
                    value={newVal?.jabatan}
                    onChange={(event, newValue) => { setNewVal({...newVal, jabatan: newValue.label})}}
                    options={positions}
                    renderInput={(params) => <TextField {...params} label="jabatan" />}
                    fullWidth
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
