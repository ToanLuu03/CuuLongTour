import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  Stack
} from "@mui/material";
import { Email, Phone, Facebook } from "@mui/icons-material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    setFormSubmitted(true);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 3, md: 6 },
        maxWidth: "1300px",
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: 24, sm: 32 },
          mb: 3,
          color: "#2A4D3E",
          textAlign: "center",
        }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        {/* FORM */}
        <Grid item xs={12} md={6}>
          <Typography sx={{ color: "#555", mb: 2, fontSize: 15 }}>
            Do you have a question or request? Please fill out the form below and we will get back to you as soon as possible.
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#43CD80",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#3bb272",
                  },
                }}
              >
                Send
              </Button>
              {formSubmitted && (
                <Typography variant="body2" color="green">
                  Thank you for contacting us. We will get back to you shortly.
                </Typography>
              )}
            </Stack>
          </Box>
        </Grid>

        {/* CONTACT INFO */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: 20, color: "#2A4D3E", mb: 2 }}
          >
            Contact Information
          </Typography>

          <Stack spacing={2}>
            <Box display="flex" alignItems="center">
              <Phone sx={{ color: "#43CD80", mr: 1 }} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                <strong>Phone:</strong>{" "}
                <Link href="tel:0949415422" underline="hover" color="inherit">
                  0949 415 422
                </Link>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Email sx={{ color: "#43CD80", mr: 1 }} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                <strong>Email:</strong>{" "}
                <Link href="mailto:cuulongvivu@gmail.com" underline="hover" color="inherit">
                  cuulongvivu@gmail.com
                </Link>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Facebook sx={{ color: "#43CD80", mr: 1 }} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                <strong>Facebook:</strong>{" "}
                <Link
                  href="https://www.facebook.com/cuulongvivu"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="inherit"
                >
                  Cuu Long Vi Vu
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
