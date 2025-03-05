import { useState } from "react";
import { Box, Typography, Divider, Rating as MUIRating, Card, Pagination } from "@mui/material";
import PropTypes from "prop-types";

const Comments = ({ comments = [] }) => {
    const [page, setPage] = useState(1);
    const commentsPerPage = 5;

    // Tính toán chỉ mục bắt đầu và kết thúc
    const startIndex = (page - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const currentComments = comments.slice(startIndex, endIndex);

    if (!comments || comments.length === 0) {
        return <Typography variant="body2">No reviews available.</Typography>;
    }

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                User reviews:
            </Typography>

            {currentComments.map((comment, index) => (
                <Card key={index} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" component="span" fontWeight="bold">
                        {comment.user || "Anonymous"} -{" "}
                        {comment.date ? new Date(comment.date).toLocaleDateString() : "Unknown date"}
                    </Typography>

                    <Typography variant="body2" paragraph>
                        {comment.comment || "No comment provided"}
                    </Typography>

                    <Box display="flex" alignItems="center" mb={1}>
                        <MUIRating value={Number(comment.rating) || 0} readOnly size="small" precision={0.5} />
                    </Box>

                    {comment.text && <Typography variant="body1">{comment.text}</Typography>}

                    <Divider sx={{ my: 2 }} />
                </Card>
            ))}

            {/* Phân trang */}
            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};

// Định nghĩa PropTypes
Comments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string,
            rating: PropTypes.number,
            text: PropTypes.string,
            comment: PropTypes.string,
            date: PropTypes.string,
        })
    ),
};

export default Comments;
