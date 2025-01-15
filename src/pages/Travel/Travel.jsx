import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { getAll_travels } from "../../services/Travel/TravelAPI";
import RatingComponent from "../../components/Rating/RatingComponent";

const Travel = () => {
  const [travelData, setTravelData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch travel data from the API
    const fetchTravels = async () => {
      try {
        const response = await getAll_travels();
        if (response.success && Array.isArray(response.data)) {
          setTravelData(response.data); // Set the travel data
        } else {
          console.error("Invalid data format:", response);
        }
      } catch (error) {
        console.error("Error fetching travel data:", error);
      }
    };

    fetchTravels();
  }, []);

  return (
    <div className="p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Khám Phá Địa Điểm Du Lịch
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
              }}>
              <CardMedia
                component="img"
                height="200"
                image={location.img} // Use the correct property name
                alt={location.location} // Updated for clarity
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {location.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {location.description}
                </Typography>
                <RatingComponent reviews={location.reviews} />
                <Link
                  to={`/travel/travel_detail/${location._id}`}
                  style={{ color: '#1976d2', textDecoration: 'none', marginTop: '8px', display: 'inline-block' }}
                >
                  Xem Chi Tiết
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Travel;
