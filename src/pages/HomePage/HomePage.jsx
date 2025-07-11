import {
  Box,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Thêm style cho carousel
import Location from "../../components/Location/Location";
import Hotel from "../../components/Hotel/Hotel";
import Specialities from "../../components/Specialities/Specialities";
import TravelTip from "../../components/TravelTip/TravelTip";
import HeroSection from "../../components/Homepage/HeroSection";
const HomePage = () => {
  return (
    <Box sx={{
      
      px: { xs: 2, sm: 4 },
      background: "linear-gradient(135deg,rgb(236, 238, 241) 0%,rgb(255, 255, 255) 100%)",
    }}>
      <Box id="hero">
        <HeroSection />
      </Box>
      <Box id="location">
        <Location />
      </Box>
      <Box id="hotel">
        <Hotel />
      </Box>
      <Box id="specialities">
        <Specialities />
      </Box>
      <Box id="traveltip">
        <TravelTip />
      </Box>
    </Box>
  );
};

export default HomePage;
