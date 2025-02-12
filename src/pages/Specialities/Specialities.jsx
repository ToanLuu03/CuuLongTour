import { useEffect, useState } from "react";
import { getAll_Specialty } from "../../services/Specialities/Specialities";
import { Card, CardContent, CardMedia, Grid, Typography, CircularProgress, Box } from "@mui/material";
import SeeMore_Button from "../../components/SeeMore_Button/SeeMore_Button";

function Specialities() {
  const [specialitiesData, setSpecialitiesData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch specialities data from the API
    const fetchSpecialties = async () => {
      try {
        const response = await getAll_Specialty();
        if (response.success && Array.isArray(response.data)) {
          setSpecialitiesData(response.data); // Set the specialities data
        } else {
          console.error("Invalid data format:", response);
          setError("Error: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching specialities data:", error);
        setError("Error: Unable to fetch specialities data");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchSpecialties();
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
        Explore Local Specialties
      </Typography>
      <Grid className="pt-4" container spacing={4}>
        {specialitiesData.map((speciality) => (
          <Grid item xs={12} sm={6} md={4} key={speciality._id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                '&:hover': {
                  boxShadow: 6, // Add hover effect
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={speciality.images[0] || 'default-image-url'} // Default image URL if no image is available
                alt={speciality.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {speciality.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Category: {speciality.category}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Price: {speciality.price.toLocaleString()} VND
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {speciality.description?.slice(0, 100)}...
                </Typography>
                <SeeMore_Button link={`/specialities/${speciality._id}`} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Specialities;
