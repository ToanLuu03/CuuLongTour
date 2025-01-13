import { Box, Typography, Divider, Rating as MUIRating } from "@mui/material";
import PropTypes from "prop-types";  // Import PropTypes

const Comments = ({ comments }) => { 

    return (
        <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
                Reviews
            </Typography>
            {comments.map((comment, index) => (
                <Box key={index} mb={2}>
                    <Typography variant="h6" component="span" fontWeight="bold">
                        {comment.user}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                        <MUIRating value={comment.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="body1">{comment.text}</Typography>
                    <Divider sx={{ my: 2 }} />
                </Box>
            ))}
        </Box>
    );
};

// Prop validation for 'comments' prop
Comments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Comments;
