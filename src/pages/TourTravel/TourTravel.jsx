import { useEffect, useState } from "react";
import { getAll_tours } from "../../services/Tour/Tour";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Container,
  Chip,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { Search, LocationOn, AccessTime, AttachMoney } from "@mui/icons-material";
import SeeMore_Button from "../../components/SeeMore_Button/SeeMore_Button";
import Rating from '@mui/material/Rating';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const TourTravel = () => {
  const [travelData, setTravelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await getAll_tours();
        if (response.success && Array.isArray(response.data)) {
          setTravelData(response.data);
          setFilteredData(response.data);

          // Extract unique locations
          const uniqueLocations = [...new Set(response.data.map(tour => tour.location).filter(Boolean))];
          setLocations(uniqueLocations);
        } else {
          console.error("Invalid data format:", response);
          setError("Error: Unable to fetch Tour data");
        }
      } catch (error) {
        console.error("Error fetching travel data:", error);
        setError("Error: Unable to fetch Tour data");
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  useEffect(() => {
    let filtered = travelData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tour =>
        tour.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter(tour => tour.location === locationFilter);
    }

    // Filter by duration
    if (durationFilter) {
      filtered = filtered.filter(tour => {
        const duration = tour.duration;
        switch (durationFilter) {
          case '1-day':
            return duration === 1;
          case '2-3-days':
            return duration >= 2 && duration <= 3;
          case '4-7-days':
            return duration >= 4 && duration <= 7;
          case 'over-7-days':
            return duration > 7;
          default:
            return true;
        }
      });
    }

    // Filter by price range
    if (priceFilter) {
      filtered = filtered.filter(tour => {
        const price = tour.price;
        switch (priceFilter) {
          case 'under-500k':
            return price < 500000;
          case '500k-1m':
            return price >= 500000 && price < 1000000;
          case '1m-2m':
            return price >= 1000000 && price < 2000000;
          case 'over-2m':
            return price >= 2000000;
          default:
            return true;
        }
      });
    }

    setFilteredData(filtered);
  }, [searchQuery, locationFilter, durationFilter, priceFilter, travelData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDurationFilter(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceFilter(event.target.value);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh'
          }}
        >
          <CircularProgress size={60} sx={{ color: '#059669' }} />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="error" gutterBottom>
              {error}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please try again later or contact support if the problem persists.
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB' }}>
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Discover Famous Tours In Mekong Delta
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                opacity: 0.9,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Explore the beautiful waterways, floating markets, and cultural heritage of the Mekong Delta
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Chip
                label={`${filteredData.length} Tours Available`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>
          </Container>
        </HeroSection>

        <Container maxWidth="lg" sx={{ pb: 6 }}>
          {/* Search and Filter Section */}
          <Box sx={{ mb: 4 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems="center"
              sx={{
                bgcolor: 'white',
                p: 3,
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search tours by name, description, or location..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#059669' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#059669',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#059669',
                    },
                  },
                }}
              />

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Location</InputLabel>
                <Select
                  value={locationFilter}
                  onChange={handleLocationChange}
                  label="Location"
                  startAdornment={<LocationOn sx={{ color: '#059669', mr: 1 }} />}
                >
                  <MenuItem value="">All Locations</MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={durationFilter}
                  onChange={handleDurationChange}
                  label="Duration"
                  startAdornment={<AccessTime sx={{ color: '#059669', mr: 1 }} />}
                >
                  <MenuItem value="">All Durations</MenuItem>
                  <MenuItem value="1-day">1 Day</MenuItem>
                  <MenuItem value="2-3-days">2-3 Days</MenuItem>
                  <MenuItem value="4-7-days">4-7 Days</MenuItem>
                  <MenuItem value="over-7-days">Over 7 Days</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 160 }}>
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={priceFilter}
                  onChange={handlePriceChange}
                  label="Price Range"
                  startAdornment={<AttachMoney sx={{ color: '#059669', mr: 1 }} />}
                >
                  <MenuItem value="">All Prices</MenuItem>
                  <MenuItem value="under-500k">Under 500K VND</MenuItem>
                  <MenuItem value="500k-1m">500K - 1M VND</MenuItem>
                  <MenuItem value="1m-2m">1M - 2M VND</MenuItem>
                  <MenuItem value="over-2m">Over 2M VND</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* Results Section */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#047857' }}>
                {searchQuery || locationFilter || durationFilter || priceFilter ? 'Search Results' : 'All Tours'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} {filteredData.length === 1 ? 'tour' : 'tours'} found
              </Typography>
            </Stack>
          </Box>

          {/* Tours Grid */}
          {filteredData.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No tours found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or browse all tours
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredData.map((tour) => (
                <Grid item xs={12} sm={6} md={4} key={tour._id}>
                  <StyledCard>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={tour.img?.[0] || '/api/placeholder/400/200'}
                        alt={tour.tour}
                        sx={{
                          objectFit: 'cover',
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(5, 150, 105, 0.5), transparent)',
                        }}
                      />
                      <Chip
                        label={tour.location}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: '#FFD700',
                          color: '#047857',
                          fontWeight: 600,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, px: 2.5, bgcolor: '#F9FAFB' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: '#047857',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={tour.tour}
                      >
                        {tour.tour}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          paddingBottom: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',

                        }}
                        title={tour.description}
                      >
                        {tour.description}
                      </Typography>

                      {/* Tour Details */}
                      <Stack spacing={1} sx={{}}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LocationOn sx={{ fontSize: 16, color: '#059669' }} />
                          <Typography variant="body2" color="text.secondary">
                            {tour.location}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AccessTime sx={{ fontSize: 16, color: '#059669' }} />
                          <Typography variant="body2" color="text.secondary">
                            {tour.duration} {tour.duration === 1 ? 'day' : 'days'}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Rating */}
                      {tour.rating && (
                        <Box sx={{ mb: 1 }}>
                          <Rating
                            value={Number(tour.rating)}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                        </Box>
                      )}

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 1 }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: '1.125rem',
                              fontWeight: 'bold',
                              color: 'rgb(37, 99, 235)',
                            }}
                          >
                            {tour.price.toLocaleString()} VNĐ
                          </Typography>
                        </Box>

                        <SeeMore_Button
                          sx={{
                            padding: "8px 16px",
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            borderRadius: "10px",
                            fontSize: 14,
                            fontWeight: 600,
                            textTransform: 'none',
                            border: "none",
                            '&:hover': {  
                              backgroundColor: "#1d4ed8",
                            }
                          }}
                          link={`/tour/tour_details/${tour._id}`}
                        >
                          View Details
                        </SeeMore_Button>
                      </Stack>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TourTravel;