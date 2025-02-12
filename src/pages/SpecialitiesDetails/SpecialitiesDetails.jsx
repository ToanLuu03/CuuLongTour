import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecialtyById } from "../../services/Specialities/Specialities"; // API call to fetch specialty by ID
import { Card, CardContent, Typography, Grid, Box, CircularProgress } from "@mui/material";
import ImageCarousel from "../../components/Carousel/ImageCarousel";

function SpecialitiesDetails() {
    const { id } = useParams(); // Get the ID from the URL
    const [specialty, setSpecialty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpecialtyDetails = async () => {
            try {
                const response = await getSpecialtyById(id);
                if (response.success && response.data) {
                    setSpecialty(response.data);
                } else {
                    setError("Product not found.");
                }
            } catch (error) {
                console.error('Error fetching specialty details:', error);
                setError("An error occurred while fetching the details.");
            } finally {
                setLoading(false);
            }
        };

        fetchSpecialtyDetails();
    }, [id]);

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
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={4}>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <ImageCarousel images={specialty.images} altText={specialty.name} />
                    {/* Contact Information Section */}
                    {specialty.contact && (
                        <>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', marginTop: '16px', fontWeight: 'bold' }}>
                                Contact Information
                            </Typography>
                            <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                <strong>Phone:</strong> {specialty.contact.phone}
                            </Typography>

                            <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                <strong>Email:</strong> {specialty.contact.email}
                            </Typography>

                            <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                <strong>Address:</strong> {specialty.contact.address}
                            </Typography>
                        </>
                    )}
                </Grid>

                {/* Product Information Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3, borderRadius: '16px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                {specialty.name}
                            </Typography>

                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                Category: {specialty.category}
                            </Typography>

                            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                                <strong>Description:</strong> {specialty.description}
                            </Typography>

                            <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                <strong>Price:</strong> {specialty.price.toLocaleString()} VND
                            </Typography>

                            <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                <strong>Origin:</strong> {specialty.origin}
                            </Typography>

                            {specialty.ingredients && (
                                <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                    <strong>Ingredients:</strong> {specialty.ingredients.join(', ')}
                                </Typography>
                            )}

                            {specialty.expirationDate && (
                                <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                    <strong>Expiration Date:</strong> {new Date(specialty.expirationDate).toLocaleDateString()}
                                </Typography>
                            )}

                            {specialty.certification?.name && (
                                <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                    <strong>Certification:</strong> {specialty.certification.name}
                                </Typography>
                            )}

                            {specialty.packaging && (
                                <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
                                    <strong>Packaging:</strong> {specialty.packaging}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box >
    );
}

export default SpecialitiesDetails;
