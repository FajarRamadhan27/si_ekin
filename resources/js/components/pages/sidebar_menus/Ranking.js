import { Typography } from "@mui/material"
import RankTable from "../../containers/tables/RankTable"

function Ranking() {
    return (
        <>
            <Typography
                sx={{ flex: '1 1 100%', mb: 1 }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
               Ranking
            </Typography>
            <RankTable/>
        </>
    )
}

export default Ranking
