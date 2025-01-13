import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { h2 } from "../../assets/imgs/image"

function Hotel() {
    const hotels = [
        {
            name: "Vinpearl Cần Thơ",
            description: "Khách sạn sang trọng 5 sao tại trung tâm Cần Thơ.",
            image: h2,
        },
        {
            name: "Mekong Lodge",
            description: "Khu nghỉ dưỡng giữa vườn cây xanh mát ở Tiền Giang.",
            image: h2,
        },
    ];
    return (
        <div>
            {/* Hotels */}
            <Box sx={{ my: 6, px: 4 }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600, mb: 4 }}>
                    Khách Sạn Đề Xuất
                </Typography>
                <Grid container spacing={4}>
                    {hotels.map((hotel, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={hotel.image}
                                    alt={hotel.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {hotel.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {hotel.description}
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

export default Hotel