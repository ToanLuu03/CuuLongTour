import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { getHotelById } from "../../services/Hotel/Hotel";
import RatingComponent from "../../components/Rating/RatingComponent";
import Comments from "../../components/Comment/Comment";
import ImageCarousel from "../../components/Carousel/ImageCarousel";

function HotelDetail() {
    const { id } = useParams(); // Lấy id từ URL
    const [hotelDetail, setHotelDetail] = useState(null); // State để lưu thông tin chi tiết
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // Fetch hotel details từ API
        const fetchHotelById = async () => {
            try {
                const response = await getHotelById(id);
                setHotelDetail(response.data); // Set dữ liệu vào state
            } catch (error) {
                console.error("Error fetching hotel detail:", error);
                setError("Error: Unable to fetch Hotel data");
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };
        fetchHotelById();
    }, [id]);


    if (loading) {
        return (
            <div className="p-4">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Box className="p-4">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <div className="p-4">
            <Typography variant="h4" component="h1" sx={{ color: '#1976d2' }} gutterBottom>
                {hotelDetail.name} - {hotelDetail.address.city}, {hotelDetail.address.province}
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {/* Sử dụng ImageCarousel để hiển thị hình ảnh khách sạn */}
                    <ImageCarousel images={hotelDetail.images} altText={hotelDetail.name} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="body1" paragraph>
                            {hotelDetail.description}
                        </Typography>

                        <Typography variant="h6" sx={{ color: '#1976d2' }} gutterBottom>
                            Utility:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {hotelDetail.amenities.join(", ")}
                        </Typography>
                        <RatingComponent reviews={hotelDetail.reviews} />

                        <Typography variant="h6" sx={{ color: '#1976d2' }} gutterBottom>
                            Contact:
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Phone:</strong> {hotelDetail.phoneNumber}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Facebook:</strong>{" "}
                            <a href={hotelDetail.facebookLink} target="_blank" rel="noopener noreferrer">
                                {hotelDetail.facebookLink}
                            </a>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Instagram:</strong>{" "}
                            <a href={hotelDetail.instagramLink} target="_blank" rel="noopener noreferrer">
                                {hotelDetail.instagramLink}
                            </a>
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>

            <div className="mt-4">
                <Comments comments={hotelDetail.reviews} />
            </div>
        </div>
    );
}

export default HotelDetail;
