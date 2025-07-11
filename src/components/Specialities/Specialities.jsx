import { Box, Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import SeeMore_Button from "../SeeMore_Button/SeeMore_Button";
import { get_5_specialities } from "../../services/Specialities/Specialities";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function Specialities() {
  const [specialities, setSpecialities] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_5_specialities();
      setSpecialities(data);
    };
    fetchData();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.offsetWidth;
      const scrollLeft = direction === 'left'
        ? current.scrollLeft - scrollAmount
        : current.scrollLeft + scrollAmount;

      current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        mt: 2,
        mb: 2,
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
          Specialities
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
            {specialities.slice(0, 4).map((special) => (
              <Card
                key={special._id}
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
                    image={special.images[0]}
                    alt={special.name}
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
                    title={special.name}
                  >
                    {special.name}
                  </Typography>

                  <Stack spacing={1.2}>
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
                      title={special.description}
                    >
                      {special.description}
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
                          fontSize: { xs: 14, sm: 16 },
                          fontWeight: 'bold',
                          color: '#43CD80',
                          lineHeight: 1,
                        }}
                      >
                        {(special.price).toLocaleString()} VNĐ
                      </Typography>
                    </Box>
                    <Box sx={{ borderRadius: '8px', color: 'white' }}>
                      <SeeMore_Button
                        sx={{
                          padding: { xs: "2px 8px", sm: "3px 10px" },
                          backgroundColor: "#43CD80",
                          color: "#fff",
                          borderRadius: "10px",
                          fontSize: { xs: 12, sm: 14 },
                          border: "none",
                          minWidth: { xs: 70, sm: 90 },
                          '&:hover': {
                            backgroundColor: "#43CD80",
                          }
                        }}
                        link={`/specialities/${special._id}`}
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
            paddingTop: { xs: '10px', md: '20px' },
            paddingBottom: { xs: "12px", md: "30px" }
          }}>
            <SeeMore_Button
              sx={{
                padding: { xs: "5px 18px", sm: "5px 60px", md: "5px 100px" },
                backgroundColor: "#43CD80",
                color: "#fff",
                borderRadius: "10px",
                fontSize: { xs: 13, md: 16 },
                border: "none",
                minWidth: { xs: 120, sm: 180 },
                '&:hover': {
                  backgroundColor: "#43CD80",
                }
              }}
              link={`/specialities/`}
            >
              See more specialities
            </SeeMore_Button>
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default Specialities;