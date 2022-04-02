import { Typography } from "@mui/material"

function MyScore() {
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
        </>
    )
}

export default MyScore
