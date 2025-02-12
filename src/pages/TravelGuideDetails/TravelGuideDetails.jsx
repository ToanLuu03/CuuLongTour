import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { get_travelGuideById } from '../../services/TravelGuide/TravelGuide';

const TravelGuideDetails = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetching travel guide details based on the selected guide ID
    useEffect(() => {
        const fetchGuideDetails = async () => {
            try {
                const response = await get_travelGuideById(id);
                setGuide(response.data);
            } catch (error) {
                console.error('Error fetching guide details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuideDetails();
    }, [id]);

    // Render loading state
    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    // Render detailed travel guide
    return (
        <Box sx={{ padding: 2 }}>
            <Card>
                <img
                    src={guide.images[0]}
                    alt={guide.destination}
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography variant="h4">{guide.title}</Typography>
                    <Typography variant="h6" paragraph>{guide.destination}, {guide.country}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {guide.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Thời gian tốt nhất để ghé thăm:</strong> {guide.bestTravelTime}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Thời tiết:</strong> {guide.weather.averageTemperature} - {guide.weather.rainfall}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Sức khỏe và An Toàn:</strong>
                        <ul>
                            {guide.healthAndSafety.generalTips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </Typography>

                    <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Thức ăn lành mạnh:</strong> {guide.healthAndSafety.foodSafety}
                    </Typography>

                    <Button variant="outlined" href="/travelGuide">Quay lại</Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default TravelGuideDetails;
