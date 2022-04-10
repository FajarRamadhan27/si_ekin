import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import TotalEmployeeCard from "../../cards/TotalEmployeeCard";

function Home() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalEmployeeCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
