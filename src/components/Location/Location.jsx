import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { LocationOn, AccessTime } from "@mui/icons-material";
import { get_5_Tours } from "../../services/Tour/Tour";
import SeeMore_Button from "../SeeMore_Button/SeeMore_Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function Location() {
  const [tours, setTours] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_5_Tours();
      setTours(data);
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        mt: { xs: 1, md: 2 },
        mb: { xs: 1, md: 2 },
        px: { xs: 0.5, sm: 2, md: '70px' },
        position: 'relative',
        maxWidth: '1400px',
        borderRadius: 2,
      }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: { xs: 22, sm: 28, md: 34 },
            mb: { xs: 2, md: 3 },
            color: '#2A4D3E',
            fontFamily: "'Roboto', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          Discover Mekong Delta Adventures
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'flex-start', md: 'space-between' },
              overflowX: { xs: 'visible', sm: 'auto' },
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { display: 'none' },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
              px: { xs: 0, md: 3 },
              py: { xs: 0.5, md: '4px' },
              touchAction: 'pan-x',
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {tours.slice(0, 4).map((tour) => (
              <Card
                key={tour._id}
                sx={{
                  minWidth: { xs: '95vw', sm: 220, md: 260 },
                  maxWidth: { xs: '95vw', sm: 260, md: 280 },
                  width: { xs: '95vw', sm: 'auto' },
                  mx: { xs: 'auto', sm: 0 },
                  mb: { xs: 2, sm: 0 },
                  flexShrink: 0,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={tour.img[0]}
                    alt={tour.tour}
                    sx={{
                      height: { xs: 110, sm: 140, md: 160 },
                      width: '100%',
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
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(42, 77, 62, 0.5), transparent)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: '#F1AF00',
                      color: '#1A3C34',
                      padding: { xs: '2px 7px', sm: '4px 10px' },
                      borderRadius: '12px',
                      fontSize: { xs: '12px', sm: '14px' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <AccessTime sx={{ fontSize: { xs: 13, sm: 16 } }} />
                    {tour.duration} day
                  </Box>
                </Box>

                <CardContent sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.5, sm: 1 }, bgcolor: '#F9FAFB' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: 14, sm: 17, md: 20 },
                      fontWeight: 600,
                      color: '#1A3C34',
                      mb: { xs: 1, sm: 1.5 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={tour.tour}
                  >
                    {tour.tour}
                  </Typography>

                  <Stack spacing={1.2}>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        fontSize: { xs: 12, sm: 14 },
                        color: '#3B6A5A',
                      }}
                      title={tour.location}
                    >
                      <LocationOn sx={{ fontSize: { xs: 16, sm: 20 } }} />
                      {tour.location}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: 12, sm: 15 },
                        color: '#666',
                        lineHeight: 1.6,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        mb: { xs: 1, sm: 1.5 },
                      }}
                      title={tour.description}
                    >
                      {tour.description}
                    </Typography>
                  </Stack>

                  <Stack
                    sx={{
                      mt: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          fontSize: { xs: 12, sm: 16 },
                          fontWeight: 'bold',
                          color: 'rgb(37, 99, 235)',
                          lineHeight: 1,
                        }}
                      >
                        {tour.price.toLocaleString()} VNĐ
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: 10, sm: 11 },
                          color: '#6B7280',
                          fontWeight: 400,
                          ml: 0.5,
                        }}
                      >
                        / person
                      </Typography>
                    </Box>
                    <Box sx={{ borderRadius: '8px', color: 'white' }}>
                      <SeeMore_Button
                        sx={{
                          padding: { xs: "2px 8px", sm: "3px 10px" },
                          backgroundColor: "#F1AF00",
                          color: "#fff",
                          borderRadius: "10px",
                          fontSize: { xs: 12, sm: 14 },
                          border: "none",
                          minWidth: { xs: 70, sm: 90 },
                          '&:hover': {
                            backgroundColor: "#FF5E1F",
                          }
                        }}
                        link={`/tour/tour_details/${tour._id}`}
                      >
                        Details
                      </SeeMore_Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{
            borderRadius: '8px',
            color: 'white',
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            paddingTop: { xs: '8px', md: '20px' },
            paddingBottom: { xs: "10px", md: "30px" }
          }}>
            <SeeMore_Button
              sx={{
                padding: { xs: "5px 18px", sm: "5px 60px", md: "5px 100px" },
                backgroundColor: "#F1AF00",
                color: "#fff",
                borderRadius: "10px",
                fontSize: { xs: 13, md: 16 },
                border: "none",
                minWidth: { xs: 120, sm: 180 },
                '&:hover': {
                  backgroundColor: "#FF5E1F",
                }
              }}
              link={`/tour/`}
            >
              See more tours
            </SeeMore_Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Location;