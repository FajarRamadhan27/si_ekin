import { Typography } from "@mui/material"
import HistoryTable from "../../containers/tables/HistoryTable"

function History() {
    return (
        <>
            <Typography
                sx={{ flex: '1 1 100%', mb: 1 }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
               History
            </Typography>
            <HistoryTable/>
        </>
    )
}

export default History
