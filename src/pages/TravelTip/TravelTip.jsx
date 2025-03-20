
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress } from '@mui/material';
import { getAll_travelTip } from "../../services/TravelTip/TravelTip"
import SeeMore_Button from '../../components/SeeMore_Button/SeeMore_Button';
function TravelTip() {
    const [travelTips, setTravelTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling
    useEffect(() => {
        const fetchTravelGuides = async () => {
            try {
                const response = await getAll_travelTip();
                setTravelTips(response.data);
            } catch (error) {
                console.error('Error fetching travel guides:', error);
                setError("Error: Unable to fetch Travel Tip data");
            } finally {
                setLoading(false);
            }
        };

        fetchTravelGuides();
    }, []);


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
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Travel tips – From local experts
            </Typography>
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={4}>
                    {travelTips.map((tip) => (
                        <Grid item xs={12} sm={6} md={4} key={tip._id}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                }}>
                                <img
                                    src={tip.image[0]}
                                    alt={tip.description}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6">{tip.title}</Typography>
                                    <SeeMore_Button link={`/blog/${tip._id}`} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default TravelTip