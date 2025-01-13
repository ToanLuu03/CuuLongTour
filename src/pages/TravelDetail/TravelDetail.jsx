import { useParams } from "react-router-dom";
import travelData from "../../data/travelData";
import { Typography, Box, Link, Paper } from "@mui/material";
import Comments from "../../components/Comment/Comment";

const TravelDetail = () => {
    const { id } = useParams(); // Retrieve the ID from the URL
    const location = travelData.find((item) => item.id === id); // Find the location with the matching ID
    if (!location) {
        return <div>Location not found.</div>; // Handle case if location is not found
    }

    return (
        <div className="p-4">
            <Typography variant="h4" component="h1" gutterBottom>
                {location.title}
            </Typography>
            <img
                src={location.image}
                alt={location.title}
                className="w-full h-80 object-cover rounded-md mb-3"
            />
            <Typography variant="body1" paragraph>
                {location.details}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
                {location.description}
            </Typography>
            <Box mt={2}>
                <Typography variant="h6" component="span" fontWeight="bold">
                    Rating: {location.rating} ⭐
                </Typography>
            </Box>

            {/* Contact Information */}
            <Box mt={4} component={Paper} elevation={3} p={2}>
                <Typography variant="h6" gutterBottom>
                    Contact to book a tour
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Phone:</strong> {location.phone}
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Facebook:</strong>{" "}
                    <Link href={location.facebook} target="_blank" rel="noopener noreferrer" color="primary">
                        Visit Facebook
                    </Link>
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Instagram:</strong>{" "}
                    <Link href={location.instagram} target="_blank" rel="noopener noreferrer" color="primary">
                        Visit Instagram
                    </Link>
                </Typography>
            </Box>

            {/* Comments Section */}
            <Comments comments={location.comments} />
        </div>
    );
};

export default TravelDetail;
