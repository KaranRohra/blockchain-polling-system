import React, { useEffect, useState } from "react";
import Header from "components/Header";
import HomeContent from "components/HomeContent";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getAllPollsAPI } from "services/pollAPIs";

function Home() {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        getAllPollsAPI()
            .then((response) => {
                setPolls(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <Box sx={{ overflow: "scroll" }}>
            <Header />
            <Grid m={3} container spacing={2}>
                {polls.map((poll, key) => (
                    <Grid item key={key} xs={4}>
                        <HomeContent poll={poll.block.poll_details} pollId={poll.block.index} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Home;
