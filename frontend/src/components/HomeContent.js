import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";

function HomeContent({poll}) {
    return (
        <Card sx={{width: "80%"}}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {poll.poll_question}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Poll</Button>
            </CardActions>
        </Card>
    );
}

export default HomeContent;
