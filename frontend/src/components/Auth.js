import React, { useState } from "react";
import GoogleButton from "react-google-button";
import {
    Box,
    Button,
    Container,
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    Typography,
    Link,
    Alert,
    CircularProgress,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { useUserAuth } from "context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);
    const { login, googleLogin } = useUserAuth();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleSubmit = () => {
        setLoading(true);
        login(email, password)
            .then((response) => {
                cookies.set("token", email);
                navigate("/");
            })
            .catch((e) => {
                setAlert({ variant: "error", message: e.message });
                setLoading(false);
            });
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        googleLogin()
            .then((response) => {
                cookies.set("token", email);
                navigate("/");
            })
            .catch((e) => {
                setAlert({ variant: "error", message: e.message });
                setLoading(false);
            });
    };

    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div>
                <Typography
                    sx={{ fontSize: 28 }}
                    variant="h5"
                    color="primary"
                    m={3}
                >
                    Blockchain Polling System
                </Typography>

                <Paper component="form" sx={{ border: "1px solid grey" }}>
                    {alert.message && (
                        <Box>
                            <Alert severity={alert.variant}>
                                {alert.message}
                            </Alert>
                        </Box>
                    )}
                    <Box sx={{ m: 2 }}>
                        <TextField
                            label="Email"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ m: 2 }}>
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    {loading ? (
                        <Box m={2} sx={{ textAlign: "center" }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div>
                            <Box m={2} sx={{ textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    sx={{ width: "100%" }}
                                    onClick={handleSubmit}
                                >
                                    Login
                                </Button>
                                <h3>OR</h3>
                            </Box>
                            <Box m={2}>
                                <GoogleButton
                                    type="dark"
                                    label="Sign in with Google"
                                    onClick={handleGoogleLogin}
                                    style={{ width: "100%" }}
                                />
                            </Box>
                        </div>
                    )}
                    <Box m={2} sx={{ textAlign: "center" }}>
                        <Typography>
                            Don't have an account?{" "}
                            <Link href="/register">Register</Link>
                        </Typography>
                    </Box>
                </Paper>
            </div>
        </Container>
    );
}

export default Auth;
