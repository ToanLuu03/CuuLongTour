import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Box } from "@mui/material";

const Rating = (rating) => {
  const value = rating.rating || 0; // Lấy giá trị số từ object rating
  const fullStars = Math.max(0, Math.floor(value));
  const hasHalfStar = value % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <Box className="d-flex align-items-center mb-3">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-warning" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-warning" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} className="text-secondary" />
      ))}
    </Box>
  );
};

export default Rating;
