import * as React from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { useUserAuth } from "context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Header = () => {
    const pages = ["Home", "Create Poll"];
    const {logout} = useUserAuth();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleLogout = async () => {
        navigate("/auth");
        cookies.remove("token");
        await logout();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Polling System
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{
                                    ml: 2,
                                    color: "white",
                                    display: "block",
                                    border: "1px solid black",
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Header;
