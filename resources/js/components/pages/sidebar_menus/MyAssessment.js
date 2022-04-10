import { Typography } from "@mui/material"
import AssessmentTable from "../../containers/tables/AssessmentTable"

function MyAssessment() {
    return (
        <>
            <Typography
                sx={{ flex: '1 1 100%', mb: 1 }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
               Penilaian Saya
            </Typography>
            <AssessmentTable/>
        </>
    )
}

export default MyAssessment
