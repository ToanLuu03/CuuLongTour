import { useEffect, useState } from "react";
import { getAll_Hotels } from "../../services/Hotel/Hotel";
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
import { Search, FilterList, LocationOn, Star } from "@mui/icons-material";
import SeeMore_Button from "../../components/SeeMore_Button/SeeMore_Button";
import RatingComponent from "../../components/Rating/RatingComponent";
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
  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

function Hotel() {
  const [hotelData, setHotelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAll_Hotels();
        if (response.success && Array.isArray(response.data)) {
          setHotelData(response.data);
          setFilteredData(response.data);
          
          // Extract unique cities
          const uniqueCities = [...new Set(response.data.map(hotel => hotel.address?.city).filter(Boolean))];
          setCities(uniqueCities);
        } else {
          console.error("Invalid data format:", response);
          setError("Error: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setError("Error: Unable to fetch Hotel data");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    let filtered = hotelData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.address?.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.address?.province.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by city
    if (cityFilter) {
      filtered = filtered.filter(hotel => hotel.address?.city === cityFilter);
    }

    // Filter by price range
    if (priceFilter) {
      filtered = filtered.filter(hotel => {
        const price = hotel.pricePerNight;
        switch (priceFilter) {
          case 'under-1m':
            return price < 1000000;
          case '1m-2m':
            return price >= 1000000 && price < 2000000;
          case '2m-3m':
            return price >= 2000000 && price < 3000000;
          case 'over-3m':
            return price >= 3000000;
          default:
            return true;
        }
      });
    }

    setFilteredData(filtered);
  }, [searchQuery, cityFilter, priceFilter, hotelData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityFilter(event.target.value);
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
          <CircularProgress size={60} sx={{ color: '#2563eb' }} />
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
              Explore Travel Hotels
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
              Discover amazing hotels and create unforgettable memories with our curated collection
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Chip 
                label={`${filteredData.length} Hotels Available`} 
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
                placeholder="Search hotels by name or location..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#2563eb' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                    },
                  },
                }}
              />
              
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>City</InputLabel>
                <Select
                  value={cityFilter}
                  onChange={handleCityChange}
                  label="City"
                  startAdornment={<LocationOn sx={{ color: '#2563eb', mr: 1 }} />}
                >
                  <MenuItem value="">All Cities</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 180 }}>
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={priceFilter}
                  onChange={handlePriceChange}
                  label="Price Range"
                >
                  <MenuItem value="">All Prices</MenuItem>
                  <MenuItem value="under-1m">Under 1M VND</MenuItem>
                  <MenuItem value="1m-2m">1M - 2M VND</MenuItem>
                  <MenuItem value="2m-3m">2M - 3M VND</MenuItem>
                  <MenuItem value="over-3m">Over 3M VND</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* Results Section */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#1d4ed8' }}>
                {searchQuery || cityFilter || priceFilter ? 'Search Results' : 'All Hotels'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} {filteredData.length === 1 ? 'hotel' : 'hotels'} found
              </Typography>
            </Stack>
          </Box>

          {/* Hotels Grid */}
          {filteredData.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hotels found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or browse all hotels
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredData.map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel._id}>
                  <StyledCard>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={hotel.images?.[0] || '/api/placeholder/400/200'}
                        alt={hotel.name}
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
                          background: 'linear-gradient(to top, rgba(37, 99, 235, 0.5), transparent)',
                        }}
                      />
                      <Chip
                        label={hotel.address?.city || 'Unknown City'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: '#FFD700',
                          color: '#1d4ed8',
                          fontWeight: 600,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, px: 2.5, py: 2, bgcolor: '#F9FAFB' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: '#1d4ed8',
                          mb: 1.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={hotel.name}
                      >
                        {hotel.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.6,
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '3rem',
                        }}
                        title={hotel.address ? `${hotel.address.street}, ${hotel.address.city}, ${hotel.address.province}, ${hotel.address.country}` : 'Address not available'}
                      >
                        <LocationOn sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                        {hotel.address ? 
                          `${hotel.address.street}, ${hotel.address.city}, ${hotel.address.province}, ${hotel.address.country}` 
                          : 'Address not available'
                        }
                      </Typography>

                      {/* Rating */}
                      <Box sx={{ mb: 2 }}>
                        <RatingComponent reviews={hotel.reviews} />
                      </Box>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 'auto' }}
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
                            {hotel.pricePerNight ? hotel.pricePerNight.toLocaleString() : 'N/A'} VND
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            per night
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
                          link={`/hotel/hotel_details/${hotel._id}`}
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
}

export default Hotel;