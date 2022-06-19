import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Divider, ListItemButton, TextField } from '@mui/material';
import { findUser } from '../../utils/Axios';

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

export default function FindUserModal(props) {

  const [employees, setEmployees] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(null)
  const { inputModal, setInputModal, setEmployee } = props.uiAttr

  const handleTextChange = (event) => {
    findUser(event.target.value, setEmployees);
  }

  const handleSaveClick = () => {
    setEmployee(employees[selectedIndex])
    setInputModal(false)
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
            Cari Karyawan
          </Typography>
          <Divider/>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ p: 2, border: 'GrayText'}}>
                <TextField fullWidth onChange={(event) => handleTextChange(event)}/>
               {
                   employees && employees.map((employee, index) => {
                       return (
                            <ListItemButton
                                dense
                                sx={{ mt: 1, backgroundColor: index === selectedIndex ? 'gray' : 'transparent'}}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <div className='flex mt-2 p-2 items-baseline'>
                                    <Typography id="modal-modal-title" variant="body1" component="h2">
                                        {employee.NAME}
                                    </Typography>
                                    <Typography id="modal-modal-title" variant="caption" component="h2" sx={{ ml:1, color: 'blue'}}>
                                        {employee.JABATAN}
                                    </Typography>
                                </div>
                                <Divider/>
                            </ListItemButton>
                        )
                   })
               }
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color='error'
                    sx={{ mt: 3, mb: 2, mr: 1 }}
                    onClick={() => {
                        setInputModal(false)
                    }}
                >
                    Batal
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSaveClick}
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
