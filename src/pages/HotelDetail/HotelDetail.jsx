import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    Stack,
    Divider
} from "@mui/material";
import { getHotelById } from "../../services/Hotel/Hotel";
import RatingComponent from "../../components/Rating/RatingComponent";
import Comments from "../../components/Comment/Comment";
import ImageCarousel from "../../components/Carousel/ImageCarousel";

function HotelDetail() {
    const { id } = useParams();
    const [hotelDetail, setHotelDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotelById = async () => {
            try {
                const response = await getHotelById(id);
                setHotelDetail(response.data);
            } catch (error) {
                console.error("Error fetching hotel detail:", error);
                setError("Error: Unable to fetch Hotel data");
            } finally {
                setLoading(false);
            }
        };
        fetchHotelById();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 8 },
                py: { xs: 3, md: 5 },
                maxWidth: "1300px",
                mx: "auto",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: 24, sm: 32, md: 38 },
                    mb: 3,
                    color: "#2A4D3E",
                    textAlign: "center",
                }}
            >
                {hotelDetail.name} – {hotelDetail.address.city}, {hotelDetail.address.province}
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ImageCarousel images={hotelDetail.images} altText={hotelDetail.name} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CardContent sx={{ px: { xs: 1, sm: 2 }, py: 1 }}>
                        <Stack spacing={2}>
                            <Typography sx={{ color: "#666", lineHeight: 1.7 }}>
                                {hotelDetail.description}
                            </Typography>

                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600, fontSize: 18, color: "#1A3C34", mb: 1 }}
                                >
                                    Amenities:
                                </Typography>
                                <Typography sx={{ fontSize: 15, color: "#555" }}>
                                    {hotelDetail.amenities.join(", ")}
                                </Typography>
                            </Box>

                            <RatingComponent reviews={hotelDetail.reviews} />

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "#2A4D3E", mb: 1 }}
                                >
                                    Contact Information:
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Phone:</strong> {hotelDetail.phoneNumber}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Facebook:</strong>{" "}
                                    <a
                                        href={hotelDetail.facebookLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {hotelDetail.facebookLink}
                                    </a>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Instagram:</strong>{" "}
                                    <a
                                        href={hotelDetail.instagramLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {hotelDetail.instagramLink}
                                    </a>
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Comments comments={hotelDetail.reviews} />
            </Box>
        </Box>
    );
}

export default HotelDetail;
