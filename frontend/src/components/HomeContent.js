import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomeContent({poll, pollId}) {
    const navigate = useNavigate();
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
                <Button size="small" onClick={()=>navigate("/polls/"+ pollId)}>Poll</Button>
            </CardActions>
        </Card>
    );
}

export default HomeContent;
