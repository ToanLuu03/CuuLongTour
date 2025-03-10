import { useEffect, useState } from "react";
import { getAll_Hotels } from "../../services/Hotel/Hotel";
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import RatingComponent from "../../components/Rating/RatingComponent";
import SeeMore_Button from "../../components/SeeMore_Button/SeeMore_Button";

function Hotel() {
  const [hotelData, setHotelData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  useEffect(() => {
    // Fetch hotel data from the API
    const fetchHotels = async () => {
      try {
        const response = await getAll_Hotels();
        if (response.success && Array.isArray(response.data)) {
          setHotelData(response.data); // Set the hotel data
        } else {
          console.error("Invalid data format:", response);
          setError("Error: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setError("Error: Unable to fetch Hotel data");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchHotels();
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
    <div className="p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Explore Travel Hotels
      </Typography>
      <Grid className="pt-4" container spacing={4}>
        {hotelData.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id}>
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
                image={hotel.images[0]} // Use the correct property for image
                alt={hotel.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {hotel.address.street}, {hotel.address.city}, {hotel.address.province}, {hotel.address.country}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Price: {hotel.pricePerNight.toLocaleString()} VND per night
                </Typography>
                {/* Pass hotel.reviews instead of location.reviews */}
                <RatingComponent reviews={hotel.reviews} />
                <SeeMore_Button link={`/hotel/hotel_details/${hotel._id}`} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Hotel;
