import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Typography,
    CardContent,
    Grid,
    Stack,
    Box,
    CircularProgress,
    Button,
    Divider
} from "@mui/material";
import Comments from "../../components/Comment/Comment";
import RatingComponent from "../../components/Rating/RatingComponent";
import ImageCarousel from "../../components/Carousel/ImageCarousel";
import { getTourById } from "../../services/Tour/Tour";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookingModal from "../../components/BookingModal/BookingModal";

const TourDetails = () => {
    const { id } = useParams();
    const [travelDetail, setTravelDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openBooking, setOpenBooking] = useState(false);

    useEffect(() => {
        const fetchgetTravelById = async () => {
            try {
                const response = await getTourById(id);
                setTravelDetail(response.data);
            } catch (error) {
                console.error("Error fetching travel detail:", error);
                setError("Error: Unable to fetch Tour data");
            } finally {
                setLoading(false);
            }
        };
        fetchgetTravelById();
    }, [id]);

    const handleBook = (formData) => {
        console.log("Booking Info:", formData);
        setOpenBooking(false);
        alert("Your booking request has been sent!");
    };

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
                mx: "auto"
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: 24, sm: 32, md: 38 },
                    mb: 3,
                    color: "#2A4D3E",
                    textAlign: "center"
                }}
            >
                {travelDetail.tour}
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ImageCarousel images={travelDetail.img} altText={travelDetail.tour} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CardContent sx={{ px: { xs: 1, sm: 2 }, py: 1 }}>
                        <Stack spacing={2}>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 18,
                                    color: "#1A3C34"
                                }}
                            >
                                Location: <span style={{ fontWeight: 400 }}>{travelDetail.location}</span>
                            </Typography>

                            <Typography sx={{ color: "#666", lineHeight: 1.7 }}>
                                {travelDetail.description}
                            </Typography>

                            <Typography sx={{ fontSize: 16, color: "#43CD80", fontWeight: "bold" }}>
                                Price: {travelDetail.price.toLocaleString()} VNĐ /night
                            </Typography>

                            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <AccessTimeIcon sx={{ color: "#2A4D3E" }} />
                                <span>{travelDetail.duration} day(s)</span>
                            </Typography>

                            <RatingComponent reviews={travelDetail.reviews} />

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography variant="h6" sx={{ color: "#2A4D3E", mb: 1 }}>
                                    Contact Information:
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Phone:</strong> +{travelDetail.phone}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Facebook:</strong>{" "}
                                    <a href={travelDetail.facebook} target="_blank" rel="noopener noreferrer">
                                        {travelDetail.facebook}
                                    </a>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Instagram:</strong>{" "}
                                    <a href={travelDetail.instagram} target="_blank" rel="noopener noreferrer">
                                        {travelDetail.instagram}
                                    </a>
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                onClick={() => setOpenBooking(true)}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#43CD80",
                                    borderRadius: "10px",
                                    fontSize: 16,
                                    paddingX: 4,
                                    paddingY: 1,
                                    textTransform: "none",
                                    width: "fit-content",
                                    "&:hover": {
                                        backgroundColor: "#43CD80",
                                    },
                                }}
                            >
                                Book Now
                            </Button>
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Comments comments={travelDetail.reviews} />
            </Box>

            <BookingModal
                open={openBooking}
                handleClose={() => setOpenBooking(false)}
                handleBook={handleBook}
            />
        </Box>
    );
};

export default TourDetails;
