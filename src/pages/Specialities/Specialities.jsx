import { useEffect, useState } from "react";
import { getAll_Specialty } from "../../services/Specialities/Specialities";
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
import { Search, FilterList, Category } from "@mui/icons-material";
import SeeMore_Button from "../../components/SeeMore_Button/SeeMore_Button";
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
  background: 'linear-gradient(135deg, #2A4D3E 0%, #1A3C34 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

function Specialities() {
  const [specialitiesData, setSpecialitiesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await getAll_Specialty();
        if (response.success && Array.isArray(response.data)) {
          setSpecialitiesData(response.data);
          setFilteredData(response.data);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(response.data.map(item => item.category))];
          setCategories(uniqueCategories);
        } else {
          console.error("Invalid data format:", response);
          setError("Error: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching specialities data:", error);
        setError("Error: Unable to fetch specialities data");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  useEffect(() => {
    let filtered = specialitiesData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredData(filtered);
  }, [searchQuery, categoryFilter, specialitiesData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
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
          <CircularProgress size={60} sx={{ color: '#2A4D3E' }} />
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
              Local Specialties
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
              Discover authentic local flavors and traditional delicacies from our region
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Chip 
                label={`${filteredData.length} Specialties Available`} 
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
                placeholder="Search specialties..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#2A4D3E' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#2A4D3E',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2A4D3E',
                    },
                  },
                }}
              />
              
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  label="Category"
                  startAdornment={<Category sx={{ color: '#2A4D3E', mr: 1 }} />}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* Results Section */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#1A3C34' }}>
                {searchQuery || categoryFilter ? 'Search Results' : 'All Specialties'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} {filteredData.length === 1 ? 'specialty' : 'specialties'} found
              </Typography>
            </Stack>
          </Box>

          {/* Specialties Grid */}
          {filteredData.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No specialties found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or browse all categories
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredData.map((speciality) => (
                <Grid item xs={12} sm={6} md={4} key={speciality._id}>
                  <StyledCard>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={speciality.images?.[0] || '/api/placeholder/400/200'}
                        alt={speciality.name}
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
                          background: 'linear-gradient(to top, rgba(42, 77, 62, 0.5), transparent)',
                        }}
                      />
                      <Chip
                        label={speciality.category}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: '#FFD700',
                          color: '#1A3C34',
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
                          color: '#1A3C34',
                          mb: 1.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={speciality.name}
                      >
                        {speciality.name}
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
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '4.5rem',
                        }}
                        title={speciality.description}
                      >
                        {speciality.description}
                      </Typography>

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
                            {speciality.price.toLocaleString()} VNĐ
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
                          link={`/specialities/${speciality._id}`}
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

export default Specialities;