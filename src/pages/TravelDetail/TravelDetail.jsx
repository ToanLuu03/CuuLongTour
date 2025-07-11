import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Card, CardMedia, CardContent, Grid } from "@mui/material";
import { getTravelById } from "../../services/Travel/TravelAPI";
import Comments from "../../components/Comment/Comment";
import RatingComponent from "../../components/Rating/RatingComponent";

const TravelDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [travelDetail, setTravelDetail] = useState(null); // State để lưu thông tin chi tiết

    useEffect(() => {
        // Fetch travel details từ API
        const fetchgetTravelById = async () => {
            try {
                const response = await getTravelById(id);
                setTravelDetail(response.data); // Set dữ liệu vào state
            } catch (error) {
                console.error("Error fetching travel detail:", error);
            }
        };
        fetchgetTravelById();
    }, [id]);

    if (!travelDetail) {
        return <Typography variant="h6">Đang tải dữ liệu...</Typography>;
    }

    return (
        <div className="p-0">
            <Typography variant="h4" component="h1" gutterBottom>
                {travelDetail.location}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image={travelDetail.img}
                            alt={travelDetail.location}
                            sx={{ objectFit: "cover" }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Mô Tả
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {travelDetail.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Đánh Giá
                        </Typography>
                        <RatingComponent reviews={travelDetail.reviews} />
                        <Typography variant="h6" gutterBottom>
                            Liên Hệ
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Điện thoại:</strong> {travelDetail.phone}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Facebook:</strong>{" "}
                            <a href={travelDetail.facebook} target="_blank" rel="noopener noreferrer">
                                {travelDetail.facebook}
                            </a>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Instagram:</strong>{" "}
                            <a href={travelDetail.instagram} target="_blank" rel="noopener noreferrer">
                                {travelDetail.instagram}
                            </a>
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            {travelDetail.videoUrl && (
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Video
                        </Typography>
                        <div style={{ position: "relative", paddingTop: "56.25%" }}>
                            <iframe
                                src={travelDetail.videoUrl}
                                title="Travel Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: 0,
                                    borderRadius: 8,
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
            <div className="mt-4">
                <Comments comments={travelDetail.reviews} />
            </div>
            <Link className="btn btn-primary" to={`/travel`}                >
                Quay lại danh sách
            </Link>
        </div>
    );
};

export default TravelDetail;
