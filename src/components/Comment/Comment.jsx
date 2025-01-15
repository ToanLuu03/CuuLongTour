import { Box, Typography, Divider, Rating as MUIRating, Card } from "@mui/material";
import PropTypes from "prop-types";  // Import PropTypes

const Comments = ({ comments }) => {

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                Đánh giá từ người dùng:
            </Typography>
            {comments.map((comment, index) => (
                <Card key={index} mb={2} className="mb-3">
                    <Typography variant="h6" component="span" fontWeight="bold">
                        {comment.user}- {new Date(comment.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        {comment.comment}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                        <MUIRating value={comment.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="body1">{comment.text}</Typography>
                    <Divider sx={{ my: 2 }} />
                </Card>
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
