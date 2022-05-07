import { useEffect, useState } from "react"
import Loading from "../../containers/Loading"
import TextField from '@mui/material/TextField'
import ResetPasswordModal from "../../modals/ResetPasswordModal"
import { getEmployeeAva, getEmployeeDetail } from "../../../utils/Axios"
import { Typography, Grid, Paper, Card, CardMedia, CardContent, CardActions, Button, Alert } from "@mui/material"

function Profile(props) {

    const [employeeAva, setAva] = useState(null)
    const [detailEmployee, setDetail] = useState(null)
    const [modalResetPassword, setModal] = useState(false)
    const [flashMessage, setFlashMessage] = useState(null)

    const { user } = props.data

    useEffect(() => {
        getEmployeeAva(setAva)
        getEmployeeDetail(setDetail, user.id)

        if (flashMessage) {
            const timeout = setTimeout(() => {
                setFlashMessage(null)
            }, 2000)

            return () => clearTimeout(timeout)
        }
    }, [flashMessage])

    if (!employeeAva || !detailEmployee) {
        return <Loading uiAttr={{ open: employeeAva === null }}/>
    }

    return (
        <>
            <Typography
                sx={{ flex: '1 1 100%', mb: 1 }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
               Profile
            </Typography>
            <Paper sx={{ mt: 4 }}>
                { flashMessage ? <Alert severity="success" >{ flashMessage }</Alert> : null }
                <Grid container spacing={3} mt={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                <Card sx={{ ml: 2, mb: 2 }}>
                                    <CardMedia
                                        component="img"
                                        alt="Employee Ava"
                                        image={employeeAva}
                                        style={{ height: 350, width: 250 }}
                                    />
                                    <CardContent>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                            <Grid item lg={10} md={6} sm={6} xs={12}>
                                <div className="flex flex-col mr-4">
                                    <TextField id="outlined-basic" label="Nama" variant="outlined" value={user.name}/>
                                    <TextField id="outlined-basic" label="No Telpon" variant="outlined" value={user.no_telp} sx={{ mt:2}} />
                                    <TextField id="outlined-basic" label="Email" variant="outlined" value={user.email} sx={{ mt:2}} />
                                    <TextField id="outlined-basic" label="Jabatan" variant="outlined" value={user.jabatan} sx={{ mt:2}} />
                                    <Button
                                        size="medium"
                                        onClick={() => setModal(true)}
                                        variant="contained"
                                        color='error'
                                        sx={{ mt:2, width: 200 }}
                                    >
                                        GANTI PASSWORD
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <ResetPasswordModal uiAttr={{ modalResetPassword, setModal, setFlashMessage }}/>

            </Paper>
        </>
    )
}

export default Profile
