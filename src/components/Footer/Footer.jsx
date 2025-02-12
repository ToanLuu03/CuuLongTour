import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "primary.main",
                color: "white",
                textAlign: "center",
                width: "100%",
                p: 4,
            }}
        >
            <Typography variant="body2" gutterBottom>
                {"Copyright © "}
                {new Date().getFullYear()}
                {" Sông Cửu Long Travel. All rights reserved."}
            </Typography>
            <Grid item>
                <IconButton color="inherit" href="https://facebook.com" target="_blank">
                    <Facebook />
                </IconButton>
                <IconButton color="inherit" href="https://twitter.com" target="_blank">
                    <Twitter />
                </IconButton>
                <IconButton color="inherit" href="https://instagram.com" target="_blank">
                    <Instagram />
                </IconButton>
            </Grid>
        </Box>
    );
}

export default Footer;
