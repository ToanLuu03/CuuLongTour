import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { h3 } from "../../assets/imgs/image"

function Tour() {
      const tours = [
        {
          title: "Tour Chợ Nổi Cái Răng",
          description: "Khám phá chợ nổi, vườn trái cây và cuộc sống miền Tây.",
          image: h3,
        },
        {
          title: "Tour Du Lịch Đồng Tháp",
          description: "Tham quan Vườn Quốc Gia Tràm Chim và làng hoa Sa Đéc.",
          image: h3,
        },
      ];
  return (
    <div>
        <Box sx={{ my: 6, px: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600, mb: 4 }}>
          Các Tour Du Lịch Hấp Dẫn
        </Typography>
        <Grid container spacing={4}>
          {tours.map((tour, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={tour.image}
                  alt={tour.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {tour.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tour.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default Tour