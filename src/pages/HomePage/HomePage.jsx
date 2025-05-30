import {
  Box,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Thêm style cho carousel
import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Location from "../../components/Location/Location";
import Hotel from "../../components/Hotel/Hotel";
import Specialities from "../../components/Specialities/Specialities";
import TravelTip from "../../components/TravelTip/TravelTip";
const HomePage = () => {
  return (
    <Box sx={{
      
      px: { xs: 2, sm: 4 },
      background: "linear-gradient(135deg,rgb(236, 238, 241) 0%,rgb(255, 255, 255) 100%)",
    }}>
      {/* Carousel */}
      <CarouselComponent />

      {/* Locations */}
      <Location />

      {/* Hotels */}
      <Hotel />
      {/* Specialities */}
      <Specialities />
      { /*Travel Tip*/}
      <TravelTip />
    </Box>
  );
};

export default HomePage;
