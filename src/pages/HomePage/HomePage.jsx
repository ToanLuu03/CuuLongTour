import {
  Box,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Thêm style cho carousel
import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Location from "../../components/Location/Location";
import Hotel from "../../components/Hotel/Hotel";
import Tour from "../../components/Tour/Tour";
const HomePage = () => {
  return (
    <Box>
      {/* Carousel */}
      <CarouselComponent />

      {/* Locations */}
      <Location />

      {/* Hotels */}
      <Hotel />

      {/* Tours */}
      <Tour />
    </Box>
  );
};

export default HomePage;
