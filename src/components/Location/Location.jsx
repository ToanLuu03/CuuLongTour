import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { get_5_Tours } from "../../services/Tour/Tour";
import SeeMore_Button from "../SeeMore_Button/SeeMore_Button";

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        my: 6,
        px: { xs: 4, md: 9 }, // Padding left/right: 70px khi màn hình >= 900px
        position: "relative",
        maxWidth: "1600px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 600,
          mb: 4,
          color: "#1A3C34",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Discover Mekong Delta Adventures
      </Typography>

      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* Navigation Button Left */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: { xs: -10, sm: -35 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            bgcolor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "#ffffff" },
            transition: "all 0.3s",
          }}
        >
          <ChevronLeft sx={{ fontSize: 28, color: "#1A3C34" }} />
        </IconButton>

        {/* Scrollable Tour List */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: { xs: 2, sm: 3 },
            py: 3,
            px: { xs: 1, sm: 2 },
            "::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
          }}
        >
          {tours.map((tour) => (
            <Card
              key={tour._id}
              sx={{
                minWidth: { xs: 260, sm: 280, md: 300 },
                flexShrink: 0,
                borderRadius: "20px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={tour.img[0]}
                  alt={tour.tour}
                  sx={{ objectFit: "cover", borderRadius: "20px 20px 0 0" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                  }}
                />
              </Box>
              <CardContent sx={{ px: 3, py: 2, bgcolor: "#F9FAFB" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#1A3C34",
                    mb: 1.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={`${tour.tour} - ${tour.location}`}
                >
                  {tour.tour}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#4B5EAA",
                    lineHeight: 1.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    mb: 2,
                  }}
                  title={tour.description}
                >
                  {tour.description}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}
                  >
                    <span role="img" aria-label="location">📍</span> {tour.location}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 14, color: "#1A3C34", fontWeight: 600, mb: 2 }}
                >
                  Price: {tour.price.toLocaleString()} VND
                </Typography>
                <SeeMore_Button
                  style={{ padding: "8px 16px", fontSize: 14 }}
                  link={`/tour/tour_details/${tour._id}`}
                />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Navigation Button Right */}
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: { xs: -10, sm: -50 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            bgcolor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "#ffffff" },
            transition: "all 0.3s",
          }}
        >
          <ChevronRight sx={{ fontSize: 28, color: "#1A3C34" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Location;