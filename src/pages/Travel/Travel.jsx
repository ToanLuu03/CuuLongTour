import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import travelData from "../../data/travelData";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const Travel = () => {
  return (
    <div className="p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Khám Phá Địa Điểm Du Lịch
      </Typography>
      <Grid className="pt-4" container spacing={4}>
        {travelData.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={location.image}
                alt={location.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {location.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {location.description}
                </Typography>
                <Rating rating={location.rating} />
                <Link
                  to={`/travel/travel_detail/${location.id}`}
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
