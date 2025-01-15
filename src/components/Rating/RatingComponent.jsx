import { Box } from '@mui/material';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const RatingComponent = ({ reviews }) => {
    // Tính giá trị trung bình của rating
    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + (typeof review.rating === 'number' ? review.rating : 0), 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating(reviews);

    const fullStars = Math.max(0, Math.floor(averageRating));
    const hasHalfStar = averageRating % 1 !== 0;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

    return (
        <Box display="flex" alignItems="center" mb={2}>
            {/* Hiển thị sao đầy */}
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="text-warning" />
            ))}
            {/* Hiển thị sao nửa */}
            {hasHalfStar && <FaStarHalfAlt className="text-warning" />}
            {/* Hiển thị sao trống */}
            {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={i} className="text-secondary" />
            ))}
        </Box>
    );
};

// Add prop types validation
RatingComponent.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            rating: PropTypes.number.isRequired,
        })
    ),
};


export default RatingComponent;
