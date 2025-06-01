import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecialtyById } from "../../services/Specialities/Specialities";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import ImageCarousel from "../../components/Carousel/ImageCarousel";
import QRCodeComponent from "../../components/QRCode/QRCode";

function SpecialitiesDetails() {
  const { id } = useParams();
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
        console.error("Error fetching specialty details:", error);
        setError("An error occurred while fetching the details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialtyDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Kiểm tra specialty null hoặc undefined
  if (!specialty) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          Không tìm thấy thông tin đặc sản.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <ImageCarousel
            images={specialty.images || []}
            altText={specialty.name || ""}
          />

          {/* Contact Information Section */}
          {specialty.contact && (
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  Contact Information
                </Typography>

                <Typography
                  variant="body2"
                  paragraph
                  sx={{ color: "text.secondary" }}
                >
                  <strong>Phone:</strong> {specialty.contact.phone || "N/A"}
                </Typography>

                <Typography
                  variant="body2"
                  paragraph
                  sx={{ color: "text.secondary" }}
                >
                  <strong>Email:</strong> {specialty.contact.email || "N/A"}
                </Typography>

                <Typography
                  variant="body2"
                  paragraph
                  sx={{ color: "text.secondary" }}
                >
                  <strong>Address:</strong> {specialty.contact.address || "N/A"}
                </Typography>
              </Box>

              {/* QR Code Section */}
              <Box sx={{ width: 120, minWidth: 120 }}>
                <QRCodeComponent url={specialty.qrUrl} />
              </Box>
            </Box>
          )}
        </Grid>

        {/* Product Information Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: 3,
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f5f5f5",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                {specialty.name || "N/A"}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
                Category: {specialty.category || "N/A"}
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ color: "text.secondary" }}
              >
                <strong>Description:</strong> {specialty.description || "N/A"}
              </Typography>

              <Typography
                variant="body2"
                paragraph
                sx={{ color: "text.secondary" }}
              >
                <strong>Price:</strong>{" "}
                {typeof specialty.price === "number"
                  ? specialty.price.toLocaleString()
                  : "N/A"}{" "}
                VND
              </Typography>

              <Typography
                variant="body2"
                paragraph
                sx={{ color: "text.secondary" }}
              >
                <strong>Origin:</strong> {specialty.origin || "N/A"}
              </Typography>

              {Array.isArray(specialty.ingredients) &&
                specialty.ingredients.length > 0 && (
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ color: "text.secondary" }}
                  >
                    <strong>Ingredients:</strong>{" "}
                    {specialty.ingredients.join(", ")}
                  </Typography>
                )}

              {specialty.expirationDate &&
                !isNaN(Date.parse(specialty.expirationDate)) && (
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ color: "text.secondary" }}
                  >
                    <strong>Expiration Date:</strong>{" "}
                    {new Date(specialty.expirationDate).toLocaleDateString()}
                  </Typography>
                )}

              {specialty.certification?.name && (
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ color: "text.secondary" }}
                >
                  <strong>Certification:</strong> {specialty.certification.name}
                </Typography>
              )}

              {specialty.packaging && (
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ color: "text.secondary" }}
                >
                  <strong>Packaging:</strong> {specialty.packaging}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SpecialitiesDetails;
