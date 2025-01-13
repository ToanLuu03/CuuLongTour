import { Box, Typography } from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "primary.main",
                color: "white",
                textAlign: "center",
                py: 3,
                marginTop: "auto",
            }}
        >
            <Typography variant="body2">
                &copy; 2025 Sông Cửu Long Travel. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
