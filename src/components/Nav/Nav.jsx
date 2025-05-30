import { useState } from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/Logo.jpeg";
const pages = [
    { name: "Home", link: "/" },
    { name: "Tour", link: "/tour" },
    { name: "Hotel", link: "/hotel" },
    { name: "Blog", link: "/blog" },
    { name: "Specialities", link: "/specialities" },
    { name: "Contact", link: "/contact" },
];


const Navbar = () => {
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#fff", boxShadow: 2, minHeight: "80px", paddingTop: "6px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Logo */}
                    <Box component={Link} to="/" sx={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", }}>
                        <Box
                            component="img"
                            src={logo}
                            alt="Logo"
                            sx={{ height: 70, width: 70, borderRadius: "50%", mr: 2 }}
                        />
                    </Box>

                    {/* Menu Desktop */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.link}
                                sx={{
                                    color: location.pathname === page.link ? "blue" : "#333",
                                    fontWeight: location.pathname === page.link ? "bold" : "normal",
                                    textTransform: "none",
                                    fontSize: "1.1rem",
                                    "&:hover": { color: "blue" },
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Menu Mobile */}
                    <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon sx={{ color: "#333" }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.link}>
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            fontWeight: location.pathname === page.link ? "bold" : "normal",
                                            color: location.pathname === page.link ? "blue" : "inherit",
                                        }}
                                    >
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Đẩy nội dung xuống tránh bị navbar che mất */}
            <Box sx={{ height: "80px" }} />
        </>
    );
};

export default Navbar;
