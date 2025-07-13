import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecialtyById } from "../../services/Specialities/Specialities";
import { Star, StarBorder } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import {
  ZoomInOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import QRCodeComponent from "../../components/QRCode/QRCode";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const ProductCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(3),
}));

const ThumbnailImage = styled("img")(({ theme, selected }) => ({
  width: 80,
  height: 80,
  objectFit: "cover",
  borderRadius: 8,
  cursor: "pointer",
  border: selected ? `2px solid ${theme.palette.warning.main}` : `2px solid ${theme.palette.grey[200]}`,
  marginRight: theme.spacing(1),
}));

function SpecialitiesDetails() {
  const { id } = useParams();
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

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
      <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !specialty) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          {error || "Không tìm thấy thông tin đặc sản."}
        </Typography>
      </Box>
    );
  }

  const images = specialty.images || [];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ padding: { xs: 0.5, sm: 2, lg: 2 } }}>
          {/* Hero Section */}

          {/* Product Details Section */}
          <Box sx={{ py: { xs: 0.5, sm: 1 }, backgroundColor: "#f9fafb", gap: 2, borderRadius: 4 }}>
            <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 1 } }}>
              <Grid container spacing={2}>
                {/* Product Images */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ background: "rgba(237, 243, 227, 0.7)", p: { xs: 1, sm: 2 }, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", borderRadius: 4 }}>
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={images[selectedImageIndex]}
                        alt={specialty.name || "Product"}
                        style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 12, cursor: "pointer" }}
                        onClick={() => setIsImageZoomed(true)}
                      />
                      <IconButton
                        sx={{ position: "absolute", top: 8, right: 8, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                        onClick={() => setIsImageZoomed(true)}
                      >
                        <ZoomInOutlined />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      {images.map((image, index) => (
                        <ThumbnailImage
                          key={index}
                          src={image}
                          alt={`Product view ${index + 1}`}
                          selected={selectedImageIndex === index}
                          onClick={() => setSelectedImageIndex(index)}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                {/* Product Information */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Quick Actions */}


                    {/* Product Details Grid */}
                    <Grid container spacing={1}>
                      {/* Ingredients */}
                      {Array.isArray(specialty.ingredients) && specialty.ingredients.length > 0 && (
                        <Grid item xs={12} md={6}>
                          <ProductCard sx={{ p: { xs: 1, sm: 2 }, background: "rgba(237, 243, 227, 0.7)" }}>
                            <CardContent sx={{ px: { xs: 1, sm: 2 }, pb: 0, "&:last-child": { pb: 0, pt: 0 } }}>
                              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Ingredients
                              </Typography>
                              {specialty.ingredients.map((ingredient, index) => (
                                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                  <CheckCircleOutline sx={{ color: "#16a34a", mr: 1, width: 15, height: 15, paddingBottom: 0 }} />
                                  <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    {ingredient}
                                  </Typography>
                                </Box>
                              ))}
                            </CardContent>
                          </ProductCard>
                        </Grid>
                      )}

                      {/* Certification */}
                      {specialty.certification?.name && (
                        <Grid item xs={12} md={6}>
                          <ProductCard sx={{ p: { xs: 1, sm: 2 }, background: "rgba(237, 243, 227, 0.7)" }}>
                            <CardContent sx={{ px: { xs: 1, sm: 2 }, pb: 0, "&:last-child": { pb: 0, pt: 0 } }}>
                              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Evaluate
                              </Typography>

                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                {/* Star Rating Logic */}
                                <Box sx={{ display: "flex", mr: 2 }}>
                                  {(() => {
                                    const name = specialty.certification?.name || "";
                                    const match = name.match(/(\d+)(?:[\s-]?star)?/i);
                                    const rating = match ? parseInt(match[1]) : 0;
                                    return [...Array(5)].map((_, index) =>
                                      index < rating ? (
                                        <Star key={index} sx={{ color: "#f59e0b" }} />
                                      ) : (
                                        <StarBorder key={index} sx={{ color: "#d1d5db" }} />
                                      )
                                    );
                                  })()}
                                </Box>
                              </Box>
                            </CardContent>
                          </ProductCard>
                        </Grid>
                      )}

                      {/* Packaging */}
                      {specialty.packaging && (
                        <Grid item xs={12} md={6}>
                          <ProductCard sx={{ p: { xs: 1, sm: 2 }, background: "rgba(237, 243, 227, 0.7)" }}>
                            <CardContent sx={{ px: { xs: 1, sm: 2 }, pb: 0, "&:last-child": { pb: 0, pt: 0 } }}>
                              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Packaging
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                {specialty.packaging}
                              </Typography>
                            </CardContent>
                          </ProductCard>
                        </Grid>
                      )}

                      {/* Expiration */}
                      {specialty.expirationDate && !isNaN(Date.parse(specialty.expirationDate)) && (
                        <Grid item xs={12} md={6}>
                          <ProductCard sx={{ p: { xs: 1, sm: 2 }, background: "rgba(237, 243, 227, 0.7)" }}>
                            <CardContent sx={{ px: { xs: 1, sm: 2 }, pb: 0, "&:last-child": { pb: 0, pt: 0 } }}>
                              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Expiration Date
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                {new Date(specialty.expirationDate).toLocaleDateString()}
                              </Typography>

                            </CardContent>
                          </ProductCard>
                        </Grid>
                      )}

                      {specialty.description && (
                        <Grid item xs={12} md={12}>
                          <ProductCard sx={{ p: { xs: 1, sm: 2 }, background: "rgba(237, 243, 227, 0.7)" }}>
                            <CardContent sx={{ px: { xs: 1, sm: 2 }, pb: 0, "&:last-child": { pb: 0, pt: 0 } }}>
                              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Description
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                {specialty.description}
                              </Typography>
                            </CardContent>
                          </ProductCard>
                        </Grid>
                      )}
                    </Grid>
                  </Box>

                </Grid>
              </Grid>
              {/* QR Code and Contact Info */}
              <ProductCard ductCard sx={{ marginTop: 2, p: { xs: 1, sm: 2 }, background: "rgba(237, 243, 227, 0.7)" }}>
                <CardContent sx={{ px: { xs: 1, sm: 2 }, pb: 0, "&:last-child": { pb: 0, pt: 0 }, display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Product Information
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                      Scan QR code for more details
                    </Typography>
                    {specialty.qrUrl && (
                      <Typography
                        component="a"
                        href={specialty.qrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "#b45309", "&:hover": { color: "#92400e" } }}
                      >
                        Visit Official Website
                      </Typography>
                    )}
                    {specialty.contact && (
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ color: "#4b5563" }}>
                          <strong>Phone:</strong> {specialty.contact.phone || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#4b5563" }}>
                          <strong>Email:</strong> {specialty.contact.email || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#4b5563" }}>
                          <strong>Address:</strong> {specialty.contact.address || "N/A"}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ width: 90, height: 90, mt: { xs: 2, sm: 0 }, ml: { sm: 2 }, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingRight: 10 }}>
                    <QRCodeComponent sx={{ paddingRight: 10 }} url={specialty.qrUrl} />
                  </Box>
                </CardContent>
              </ProductCard>
            </Container>
          </Box>

          {/* Image Zoom Modal */}
          <Dialog
            open={isImageZoomed}
            onClose={() => setIsImageZoomed(false)}
            maxWidth="lg"
            sx={{ "& .MuiDialog-paper": { backgroundColor: "transparent", boxShadow: "none" } }}
          >
            <DialogContent sx={{ padding: 0, position: "relative" }}>
              <img
                src={images[selectedImageIndex] || "https://via.placeholder.com/600"}
                alt={specialty.name || "Product"}
                style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain" }}
              />
              <IconButton
                sx={{ position: "absolute", top: 16, right: 16, color: "#fff" }}
                onClick={() => setIsImageZoomed(false)}
              >
                <i className="fas fa-times" />
              </IconButton>
            </DialogContent>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default SpecialitiesDetails;