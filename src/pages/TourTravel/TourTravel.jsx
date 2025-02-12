import { Grid, Card, CardContent, CardMedia, Typography, Stack, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from 'react';
import RatingComponent from "../../components/Rating/RatingComponent";
import { getAll_tours } from "../../services/Tour/Tour";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SeeMore_Button from "../../components/SeeMore_Button/SeeMore_Button";

const TourTravel = () => {
    const [travelData, setTravelData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // Fetch travel data from the API
        const fetchTravels = async () => {
            try {
                const response = await getAll_tours();
                if (response.success && Array.isArray(response.data)) {
                    setTravelData(response.data); // Set the travel data
                } else {
                    console.error("Invalid data format:", response);
                    setError("Error: Unable to fetch Tour data");
                }
            } catch (error) {
                console.error("Error fetching travel data:", error);
                setError("Error: Unable to fetch Tour data");
            } finally {
                setLoading(false);
            }
        };

        fetchTravels();
    }, []);
    if (loading) {
        return (
            <Box className="p-4" display="flex">
                <CircularProgress />
            </Box>
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
            <Typography variant="h4" component="h1" gutterBottom>
                Discover Famous Tours In Mekong Delta
            </Typography>
            <Grid className="pt-4" container spacing={4}>
                {travelData.map((location) => (
                    <Grid item xs={12} sm={6} md={4} key={location._id}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                boxShadow: 2,
                                '&:hover': { boxShadow: 6 },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={location.img[0]} // Use the correct property name
                                alt={location.tour}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography variant="h6" noWrap gutterBottom>
                                    {location.tour}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" noWrap paragraph>
                                    {location.description}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                                    <Typography variant="subtitle2" color="textPrimary" noWrap>
                                        Location:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" noWrap>
                                        {location.location}
                                    </Typography>
                                </Stack>
                                <Box display="flex" justifyContent="space-between" marginBottom={1}>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: {location.price.toLocaleString()} VND
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                                        <AccessTimeIcon fontSize="small" />
                                        {location.duration} day(s)
                                    </Typography>
                                </Box>
                                <RatingComponent reviews={location.reviews} />
                                <SeeMore_Button link={`/tour/tour_details/${location._id}`} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TourTravel;
