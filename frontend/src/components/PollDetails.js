import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Radio,
    RadioGroup,
    CircularProgress,
    Box,
    Button,
    FormControlLabel,
    Paper,
    LinearProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { getPollAPI, givePollAPI } from "services/pollAPIs";
import { Cookies } from "react-cookie";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

function PollDetails() {
    const [loading, setLoading] = useState(true);
    const [poll, setPoll] = useState();
    const [pollOption, setPollOption] = useState();
    const navigate = useNavigate();
    const { pollId } = useParams();
    const cookies = new Cookies();

    useEffect(() => {
        getPollAPI(pollId, cookies.get("token"))
            .then((response) => {
                if (response.data.message === "Invalid poll_id") {
                    navigate("/");
                    return;
                }
                setPoll(response.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
        // eslint-disable-next-line
    }, []);

    const handleSubmit = () => {
        givePollAPI(cookies.get("token"), pollId, pollOption)
            .then((response) => {
                if (response.data.message === "Polled successfully") {
                    toast.success(response.data.message);
                    window.location.href = `/polls/${pollId}`;
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((e) => {
                toast.error(e.message);
            });
    };

    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            {loading ? (
                <Box m={2} sx={{ textAlign: "center" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div>
                    <Typography
                        sx={{ fontSize: 28 }}
                        variant="h5"
                        color="primary"
                        m={3}
                    >
                        {poll.poll_question}
                    </Typography>
                    <Paper sx={{ border: "1px solid grey", p: 3, pt: 1 }}>
                        <RadioGroup
                            defaultValue={poll.is_user_polled}
                            onChange={(e) => setPollOption(e.target.value)}
                        >
                            {poll.poll_options.map((option, key) => (
                                <React.Fragment key={key}>
                                    <FormControlLabel
                                        value={key + 1}
                                        control={<Radio />}
                                        label={option}
                                        key={key}
                                        disabled={
                                            poll.is_user_polled ? true : false
                                        }
                                    />
                                    <LinearProgressWithLabel
                                        value={poll.poll_result[key]}
                                    />
                                </React.Fragment>
                            ))}
                        </RadioGroup>

                        <Box m={2} sx={{ textAlign: "center" }}>
                            <Button
                                variant="contained"
                                sx={{ width: "100%" }}
                                onClick={handleSubmit}
                                disabled={poll.is_user_polled ? true : false}
                            >
                                {poll.is_user_polled
                                    ? "Already polled"
                                    : "Poll"}
                            </Button>
                        </Box>
                    </Paper>
                </div>
            )}
            <ToastContainer />
        </Container>
    );
}

export default PollDetails;
