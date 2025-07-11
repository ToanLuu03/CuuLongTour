import { useState } from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/Logo.jpeg";
const pages = [
    { name: "Home", link: "/" },
    { name: "Tour", link: "/tour" },
    { name: "Hotel", link: "/hotel" },
    { name: "Blog", link: "/blog" },
    { name: "Specialities", link: "/specialities" },
    { name: "Contact", link: "/contact" },
];

const sectionMap = {
    Home: "hero",
    Tour: "location",
    Hotel: "hotel",
    Blog: "traveltip",
    Specialities: "specialities",
    Contact: "footer", // hoặc id bạn đặt cho phần contact/footer
};

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavClick = (page) => {
        if (page.name === "Contact") {
            navigate("/contact");
            handleCloseNavMenu();
            return;
        }
        const sectionId = sectionMap[page.name];
        const scrollToSection = () => {
            const el = document.getElementById(sectionId);
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        };
        if (location.pathname === "/") {
            scrollToSection();
        } else {
            navigate("/", { replace: false });
            setTimeout(scrollToSection, 300);
        }
        handleCloseNavMenu();
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
                                onClick={() => handleNavClick(page)}
                                sx={{
                                    color: location.pathname === "/" && sectionMap[page.name] ? "#2E8B57" : "#333",
                                    fontWeight: location.pathname === "/" && sectionMap[page.name] ? "bold" : "normal",
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
                                <MenuItem
                                    key={page.name}
                                    onClick={() => handleNavClick(page)}
                                >
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
