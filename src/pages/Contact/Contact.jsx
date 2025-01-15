import { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Hàm xử lý thay đổi trong các input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm xử lý gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu form (bạn có thể thực hiện việc gửi dữ liệu API ở đây)
    console.log("Form Data Submitted: ", formData);
    setFormSubmitted(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Liên hệ với chúng tôi
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" paragraph>
            Bạn có câu hỏi hoặc yêu cầu? Hãy điền thông tin dưới đây và chúng tôi sẽ phản hồi bạn sớm nhất.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Họ và Tên"
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
              label="Tin nhắn"
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
              Gửi
            </Button>
          </form>
          {formSubmitted && (
            <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
              Cảm ơn bạn đã gửi yêu cầu. Chúng tôi sẽ phản hồi bạn sớm nhất.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Thông tin liên hệ
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Địa chỉ:</strong> 216/12 Đường 30/4, phường Hưng Lợi, quận Ninh Kiều, Thành Phố Cần Thơ
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Điện thoại:</strong> 0949415422
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong> luutruongtoanltt@gmail.com
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Facebook:</strong>{" "}
            <a href="https://www.facebook.com/profile.php?id=100064554986406" target="_blank" rel="noopener noreferrer">
              https://www.facebook.com/profile.php?id=100064554986406
            </a>
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Instagram:</strong>{" "}
            <a href="https://www.instagram.com/mekongriversideresort" target="_blank" rel="noopener noreferrer">
              https://www.instagram.com/mekongriversideresort
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
