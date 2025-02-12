import { Box, Typography, Divider, Rating as MUIRating, Card } from "@mui/material";
import PropTypes from "prop-types";  // Import PropTypes

const Comments = ({ comments = [] }) => {
    // Kiểm tra nếu không có dữ liệu comments
    if (!comments || comments.length === 0) {
        return <Typography variant="body2">No reviews available.</Typography>;
    }

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                User reviews:
            </Typography>
            {comments.map((comment, index) => (
                <Card key={index} sx={{ p: 2, mb: 2 }}>
                    {/* Tên người dùng + Ngày bình luận */}
                    <Typography variant="h6" component="span" fontWeight="bold">
                        {comment.user || "Anonymous"} -{" "}
                        {comment.date ? new Date(comment.date).toLocaleDateString() : "Unknown date"}
                    </Typography>

                    {/* Nội dung bình luận */}
                    <Typography variant="body2" paragraph>
                        {comment.comment || "No comment provided"}
                    </Typography>

                    {/* Xếp hạng sao */}
                    <Box display="flex" alignItems="center" mb={1}>
                        <MUIRating value={Number(comment.rating) || 0} readOnly size="small" precision={0.5} />
                    </Box>

                    {/* Văn bản bổ sung (nếu có) */}
                    {comment.text && (
                        <Typography variant="body1">{comment.text}</Typography>
                    )}

                    <Divider sx={{ my: 2 }} />
                </Card>
            ))}
        </Box>
    );
};

// Định nghĩa PropTypes
Comments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string, // Không bắt buộc
            rating: PropTypes.number, // Không bắt buộc
            text: PropTypes.string, // Không bắt buộc
            comment: PropTypes.string, // Không bắt buộc
            date: PropTypes.string, // Không bắt buộc
        })
    ),
};

export default Comments;
