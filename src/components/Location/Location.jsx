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
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ my: 6, px: 4, position: "relative" }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600, mb: 4 }}>
        Outstanding Tours in the Mekong Delta
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Nút điều hướng trái */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 10,
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "grey.200" },
            transition: "all 0.3s",
          }}
        >
          <ChevronLeft />
        </IconButton>

        {/* Danh sách các tour cuộn ngang */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 3,
            py: 2,
            px: 5,
            "::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
          }}
        >
          {tours.map((tour) => (
            <Card
              key={tour._id}
              sx={{
                minWidth: 300,
                flexShrink: 0,
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={tour.img[0]}
                alt={tour.tour}
                sx={{ objectFit: "cover", borderRadius: "16px 16px 0 0" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {tour.tour} - {tour.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {tour.description}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                  <Typography variant="subtitle2" color="textPrimary" noWrap>
                    Location:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {tour.location}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                  Price: {tour.price.toLocaleString()} VND
                </Typography>
                <SeeMore_Button link={`/tour/tour_details/${tour._id}`} />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Nút điều hướng phải */}
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 10,
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "grey.200" },
            transition: "all 0.3s",
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Location;
