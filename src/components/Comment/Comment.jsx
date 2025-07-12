import { useState } from "react";
import {
    Box,
    Typography,
    Rating as MUIRating,
    Card,
    Pagination,
    Stack
} from "@mui/material";
import PropTypes from "prop-types";

const Comments = ({ comments = [] }) => {
    const [page, setPage] = useState(1);
    const commentsPerPage = 5;

    const startIndex = (page - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const currentComments = comments.slice(startIndex, endIndex);

    if (!comments || comments.length === 0) {
        return (
            <Typography variant="body2" sx={{ mt: 2, color: "#999" }}>
                No reviews available.
            </Typography>
        );
    }

    return (
        <Box
            mt={4}
            sx={{
                px: { xs: 1, sm: 2, md: 4 },
                maxWidth: "100%",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 2,
                    fontWeight: 700,
                    fontSize: { xs: 20, sm: 24 },
                    color: "#2A4D3E"
                }}
            >
                User Reviews
            </Typography>

            <Stack spacing={2}>
                {currentComments.map((comment, index) => (
                    <Card
                        key={index}
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: 2,
                            width: "100%",
                            borderRadius: 3,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            bgcolor: "#FAFAFA"
                        }}
                    >
                        <Stack spacing={1}>
                            <Typography variant="subtitle1" fontWeight={600} color="#1A3C34">
                                {comment.user || "Anonymous"}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ ml: 1, color: "#888" }}
                                >
                                    (
                                    {comment.date
                                        ? new Date(comment.date).toLocaleDateString()
                                        : "Unknown date"}
                                    )
                                </Typography>
                            </Typography>

                            <MUIRating
                                value={Number(comment.rating) || 0}
                                readOnly
                                size="small"
                                precision={0.5}
                            />

                            <Typography
                                variant="body2"
                                sx={{ color: "#444", lineHeight: 1.7, whiteSpace: "pre-line" }}
                            >
                                {comment.comment || comment.text || "No comment provided"}
                            </Typography>
                        </Stack>
                    </Card>
                ))}
            </Stack>

            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                borderRadius: "8px"
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

Comments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string,
            rating: PropTypes.number,
            text: PropTypes.string,
            comment: PropTypes.string,
            date: PropTypes.string
        })
    )
};

export default Comments;
