import { Typography } from "@mui/material"
import ApprovalTable from "../../containers/tables/ApprovalTable"

function Approval() {
    return (
        <>
            <Typography
                sx={{ flex: '1 1 100%', mb: 1 }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
               Approval
            </Typography>
            <ApprovalTable/>
        </>
    )
}

export default Approval
