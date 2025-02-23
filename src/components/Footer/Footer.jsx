import { Facebook, Email, Phone } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, Link } from "@mui/material";

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
            <Box sx={{ mt: 2 }}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <IconButton color="inherit" href="https://www.facebook.com/cuulongvivu" target="_blank">
                            <Facebook />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" href="mailto:cuulongvivu@gmail.com">
                            <Email />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" href="tel:0949415422">
                            <Phone />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Email: <Link href="mailto:cuulongvivu@gmail.com" color="inherit">cuulongvivu@gmail.com                </Link>
                <br />
                Hotline: <Link href="tel:0949415422" color="inherit">0949 415 422</Link>
            </Typography>
        </Box>
    );
}

export default Footer;
