import { Typography } from "@mui/material"
import AssessmentInputTable from "../../containers/tables/AssessmentInputTable"

function AssessmentInput() {
    return (
        <>
            <Typography
                sx={{ flex: '1 1 100%', mb: 1 }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Input Penilaian
            </Typography>
            <AssessmentInputTable/>
        </>
    )
}

export default AssessmentInput
