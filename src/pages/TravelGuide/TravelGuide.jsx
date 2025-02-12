import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAll_travelGuide } from '../../services/TravelGuide/TravelGuide';

const TravelGuide = () => {
  const [travelGuides, setTravelGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching travel guide data from the API
  useEffect(() => {
    const fetchTravelGuides = async () => {
      try {
        const response = await getAll_travelGuide();
        setTravelGuides(response.data);
      } catch (error) {
        console.error('Error fetching travel guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelGuides();
  }, []);

  // Render loading state
  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Render each travel guide
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        {travelGuides.map((guide) => (
          <Grid item xs={12} sm={6} md={4} key={guide._id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}>
              <img
                src={guide.images[0]}
                alt={guide.destination}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6">{guide.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {guide.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Thời gian tốt nhất để ghé thăm:</strong> {guide.bestTravelTime}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Thời tiết:</strong> {guide.weather.averageTemperature} - {guide.weather.rainfall}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Ngôn ngữ:</strong> {guide.language.officialLanguage}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Chi phí:</strong> {guide.moneyAndBudget.tripCost}/day
                </Typography>

                {/* Button to navigate to the details page */}
                <Link to={`/travelguide/${guide._id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" fullWidth>
                    Xem Chi Tiết
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TravelGuide;
