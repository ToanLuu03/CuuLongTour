import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, CardContent, Grid, Stack, Box, CircularProgress } from "@mui/material";
import Comments from "../../components/Comment/Comment";
import RatingComponent from "../../components/Rating/RatingComponent";
import ImageCarousel from "../../components/Carousel/ImageCarousel";
import { getTourById } from "../../services/Tour/Tour";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TourDetails = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [travelDetail, setTravelDetail] = useState(null); // State để lưu thông tin chi tiết
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // Fetch travel details từ API
        const fetchgetTravelById = async () => {
            try {
                const response = await getTourById(id);
                setTravelDetail(response.data); // Set dữ liệu vào state
            } catch (error) {
                console.error("Error fetching travel detail:", error);
                setError("Error: Unable to fetch Tour data");
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };
        fetchgetTravelById();
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
                {travelDetail.tour}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ImageCarousel images={travelDetail.img} altText={travelDetail.tour} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                            <Typography variant="subtitle2" color="textPrimary">
                                Location:
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {travelDetail.location}
                            </Typography>
                        </Stack>
                        <Typography variant="body1" paragraph>
                            {travelDetail.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            Price: {travelDetail.price.toLocaleString()} VND per night
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            <AccessTimeIcon fontSize="medium" />
                            {travelDetail.duration} day(s)
                        </Typography>
                        <RatingComponent reviews={travelDetail.reviews} />
                        <Typography variant="h6" sx={{ color: '#1976d2' }} gutterBottom>
                            Contact:
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Điện thoại:</strong> {travelDetail.phone}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Facebook:</strong>{" "}
                            <a href={travelDetail.facebook} target="_blank" rel="noopener noreferrer">
                                {travelDetail.facebook}
                            </a>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Instagram:</strong>{" "}
                            <a href={travelDetail.instagram} target="_blank" rel="noopener noreferrer">
                                {travelDetail.instagram}
                            </a>
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            <div className="mt-4">
                <Comments comments={travelDetail.reviews} />
            </div>
        </div>
    );
};

export default TourDetails;
