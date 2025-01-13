import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { h1} from "../../assets/imgs/image"

function Location() {
     const locations = [
        {
          title: "Cần Thơ",
          description: "Bến Ninh Kiều, chợ nổi Cái Răng và ẩm thực phong phú.",
          image: h1,
        },
        {
          title: "Châu Đốc",
          description: "Núi Sam, Miếu Bà Chúa Xứ và làng nổi Châu Đốc.",
          image: h1,
        },
        {
          title: "Bạc Liêu",
          description: "Cánh đồng quạt gió và nhà công tử Bạc Liêu.",
          image: h1,
        },
      ];
  return (
    <div>
         {/* Locations */}
      <Box sx={{ my: 6, px: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600, mb: 4 }}>
          Các Điểm Đến Nổi Bật Ở Đồng Bằng Sông Cửu Long
        </Typography>
        <Grid container spacing={4}>
          {locations.map((location, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={location.image}
                  alt={location.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {location.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.description}
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

export default Location