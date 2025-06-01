import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Link } from "@mui/material";
import { Email, Phone, Facebook } from "@mui/icons-material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    setFormSubmitted(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" paragraph>
            Do you have a question or request? Please fill out the form below and we will get back to you as soon as possible.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ marginBottom: 2 }}
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
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="warning"
              fullWidth
            >
              Send
            </Button>
          </form>
          {formSubmitted && (
            <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
              Thank you for contacting us. We will get back to you shortly.
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Phone sx={{ mr: 1 }} />
            <Typography variant="body1">
              <strong>Phone:</strong>{" "}
              <Link href="tel:0949415422" color="inherit">
                0949 415 422
              </Link>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email sx={{ mr: 1 }} />
            <Typography variant="body1">
              <strong>Email:</strong>{" "}
              <Link href="cuulongvivu@gmail.com" color="inherit">
                cuulongvivu@gmail.com
              </Link>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Facebook sx={{ mr: 1 }} />
            <Typography variant="body1">
              <strong>Facebook:</strong>{" "}
              <Link
                href="https://www.facebook.com/cuulongvivu"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
               Cuu Long Vi Vu
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
