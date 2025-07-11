import { Facebook, Email, Phone } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, Link } from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
      background: "linear-gradient(135deg,rgb(236, 238, 241) 0%,rgb(255, 255, 255) 100%)",
                color: "black",
                textAlign: "center",
                width: "100%",
                py: 2, // Reduced padding
         
                boxShadow: "0 -1px 4px rgba(0,0,0,0.1)",
            }}
        >
            {/* Logo or Company Name */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    mb: 1, // Reduced margin
                    letterSpacing: 0.5,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: { xs: "1rem", sm: "1.2rem" }, // Smaller font
                }}
            >
                Cuu Long ViVu
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{ mb: 1 }}>
                <Grid container justifyContent="center" spacing={1}> {/* Reduced spacing */}
                    <Grid item>
                        <IconButton
                            color="inherit"
                            href="https://www.facebook.com/cuulongvivu"
                            target="_blank"
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    transform: "scale(1.1)",
                                    transition: "all 0.3s ease",
                                },
                            }}
                        >
                            <Facebook fontSize="medium" /> {/* Smaller icon */}
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            color="inherit"
                            href="mailto:cuulongvivu@gmail.com"
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    transform: "scale(1.1)",
                                    transition: "all 0.3s ease",
                                },
                            }}
                        >
                            <Email fontSize="medium" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            color="inherit"
                            href="tel:0949415422"
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    transform: "scale(1.1)",
                                    transition: "all 0.3s ease",
                                },
                            }}
                        >
                            <Phone fontSize="medium" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>

            {/* Contact Information */}
            <Typography
                variant="body2"
                sx={{
                    lineHeight: 1.5,
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Smaller font
                }}
            >
                Email:{" "}
                <Link
                    href="mailto:cuulongvivu@gmail.com"
                    color="inherit"
                    sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    cuulongvivu@gmail.com
                </Link>
                <br />
                Hotline:{" "}
                <Link
                    href="tel:0949415422"
                    color="inherit"
                    sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    0949 415 422
                </Link>
            </Typography>

            {/* Copyright */}
            <Typography
                variant="caption"
                sx={{
                    fontSize: { xs: "0.7rem", sm: "0.8rem" }, // Smaller font
                    opacity: 0.8,
                }}
            >
                © {new Date().getFullYear()} Cuu Long ViVu. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;