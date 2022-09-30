import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    InputAdornment,
    Paper,
    Typography,
    CircularProgress,
    Divider,
    IconButton,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { createPollAPI } from "services/pollAPIs";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

function CreatePoll() {
    const [loading, setLoading] = useState(false);
    const [question, setQuestoin] = useState();
    const [pollOption, setPollOption] = useState([""]);
    const cookies = new Cookies();

    const handleSubmit = () => {
        setLoading(true);
        createPollAPI({
            user_id: cookies.get("token"),
            poll_question: question,
            poll_options: pollOption,
        })
            .then((response) => {
                setLoading(false);
                if (response.data.message === "Poll created successfully") {
                    toast.success(response.data.message);
                    setQuestoin("");
                    setPollOption([""]);
                    return;
                }
                toast.error(response.data.message);
            })
            .catch((e) => {
                setLoading(false);
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
            <div style={{ textAlign: "center" }}>
                <Typography
                    sx={{ fontSize: 28 }}
                    variant="h5"
                    color="primary"
                    m={3}
                >
                    Create Poll
                </Typography>

                {loading ? (
                    <Box m={2} sx={{ textAlign: "center" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Paper
                        component="form"
                        sx={{ border: "1px solid grey", minWidth: 300 }}
                    >
                        <Box sx={{ m: 2 }}>
                            <TextField
                                label="Question"
                                variant="standard"
                                fullWidth
                                onChange={(e) => setQuestoin(e.target.value)}
                            />
                        </Box>
                        {pollOption.map((option, key) => (
                            <Box sx={{ m: 2, display: "flex" }} key={key}>
                                <TextField
                                    label={`Option ${key + 1}`}
                                    variant="standard"
                                    onChange={(e) => {
                                        pollOption[key] = e.target.value;
                                        setPollOption([...pollOption]);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography>
                                                    {key + 1}.
                                                </Typography>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                        pollOption.splice(
                                                            key,
                                                            1
                                                        );
                                                        setPollOption([
                                                            ...pollOption,
                                                        ]);
                                                    }}
                                                >
                                                    <Clear />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    name={`Option ${key + 1}`}
                                    defaultValue={option}
                                />
                            </Box>
                        ))}
                        <div>
                            <Box m={2} sx={{ textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    sx={{ width: "100%" }}
                                    onClick={() => {
                                        pollOption.push("");
                                        setPollOption([...pollOption]);
                                    }}
                                >
                                    Add Option
                                </Button>
                            </Box>
                        </div>
                        <Divider />

                        <div>
                            <Box m={2} sx={{ textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    sx={{ width: "100%" }}
                                    onClick={handleSubmit}
                                >
                                    Create
                                </Button>
                            </Box>
                        </div>
                    </Paper>
                )}
            </div>
        </Container>
    );
}

export default CreatePoll;
