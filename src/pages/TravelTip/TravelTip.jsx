import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Container,
  Chip,
  Stack,
  InputAdornment,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { Search, Article, TipsAndUpdates, Person } from '@mui/icons-material';
import { getAll_travelTip } from "../../services/TravelTip/TravelTip";
import SeeMore_Button from '../../components/SeeMore_Button/SeeMore_Button';
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

function TravelTip() {
  const [travelTips, setTravelTips] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchTravelGuides = async () => {
      try {
        const response = await getAll_travelTip();
        if (response.success && Array.isArray(response.data)) {
          const reversedData = [...response.data].reverse(); 
          setTravelTips(reversedData);
          setFilteredData(reversedData);

          const uniqueCategories = [...new Set(reversedData.map(tip => tip.category).filter(Boolean))];
          setCategories(uniqueCategories);
        } else {
          const reversedData = [...(response.data || [])].reverse();
          setTravelTips(reversedData);
          setFilteredData(reversedData);
        }
      } catch (error) {
        console.error('Error fetching travel guides:', error);
        setError("Error: Unable to fetch Travel Tip data");
      } finally {
        setLoading(false);
      }
    };

    fetchTravelGuides();
  }, []);


  useEffect(() => {
    let filtered = travelTips;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tip =>
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(tip => tip.category === categoryFilter);
    }

    // Sort data
    switch (sortBy) {
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredData(filtered);
  }, [searchQuery, categoryFilter, sortBy, travelTips]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <TipsAndUpdates sx={{ fontSize: '3rem', mr: 2 }} />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Travel Tips
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Get the most out of your travels with our curated collection of travel tips
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Chip
                label={`${filteredData.length} Tips Available`}
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
                placeholder="Search travel tips by title or description..."
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

              {categories.length > 0 && (
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                    label="Category"
                    startAdornment={<Article sx={{ color: '#059669', mr: 1 }} />}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="title">Title A-Z</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* Results Section */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#047857' }}>
                {searchQuery || categoryFilter ? 'Search Results' : 'All Travel Tips'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} {filteredData.length === 1 ? 'tip' : 'tips'} found
              </Typography>
            </Stack>
          </Box>

          {/* Travel Tips Grid */}
          {filteredData.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <TipsAndUpdates sx={{ fontSize: '4rem', color: '#d1d5db', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No travel tips found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or browse all tips
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredData.map((tip) => (
                <Grid item xs={12} sm={6} md={4} key={tip._id}>
                  <StyledCard>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={tip.image?.[0] || '/api/placeholder/400/200'}
                        alt={tip.title}
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
                      {tip.category && (
                        <Chip
                          label={tip.category}
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
                      )}
                      <Chip
                        icon={<Article sx={{ fontSize: '16px !important' }} />}
                        label="Travel Tip"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: 'rgba(255,255,255,0.9)',
                          color: '#047857',
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
                          color: '#047857',
                          mb: 1.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '2.5rem',
                          lineHeight: 1.2,
                        }}
                        title={tip.title}
                      >
                        {tip.title}
                      </Typography>

                      {tip.description && (
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
                        >
                          {tip.description}
                        </Typography>
                      )}

                      {tip.author && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Person sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                          <Typography variant="caption" color="text.secondary">
                            By {tip.author}
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ mt: 'auto' }}>
                        <SeeMore_Button
                          sx={{
                            width: '100%',
                            padding: "10px 16px",
                            backgroundColor: "#059669",
                            color: "#fff",
                            borderRadius: "10px",
                            fontSize: 14,
                            fontWeight: 600,
                            textTransform: 'none',
                            border: "none",
                            '&:hover': {
                              backgroundColor: "#047857",
                            }
                          }}
                          link={`/blog/${tip._id}`}
                        >
                          Read More Tips
                        </SeeMore_Button>
                      </Box>
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

export default TravelTip;