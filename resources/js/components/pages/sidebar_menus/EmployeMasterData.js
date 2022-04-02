import { Typography } from "@mui/material"
import EmployeeTable from "../../containers/EmployeeTable"

function EmployeeMasterData() {
    return (
        <>
            <Typography
                sx={{ flex: '1 1 100%', mb: 1 }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Data Karyawan
            </Typography>
            <EmployeeTable/>
        </>
    )
}

export default EmployeeMasterData
