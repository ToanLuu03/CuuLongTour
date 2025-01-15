import { useEffect, useState } from "react";
import { getAll_Hotels } from "../../services/Hotel/Hotel";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import RatingComponent from "../../components/Rating/RatingComponent";

function Hotel() {
  const [hotelData, setHotelData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch hotel data from the API
    const fetchHotels = async () => {
      try {
        const response = await getAll_Hotels();
        if (response.success && Array.isArray(response.data)) {
          setHotelData(response.data); // Set the hotel data
        } else {
          console.error("Invalid data format:", response);
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Khám Phá Khách Sạn Du Lịch
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
                  Giá: {hotel.pricePerNight.toLocaleString()} VND mỗi đêm
                </Typography>
                {/* Pass hotel.reviews instead of location.reviews */}
                <RatingComponent reviews={hotel.reviews} />
                <Link
                  to={`/hotel/hotel_details/${hotel._id}`}
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
}

export default Hotel;
