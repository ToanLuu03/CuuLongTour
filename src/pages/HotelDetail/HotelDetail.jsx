import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CardContent, Grid, Typography } from "@mui/material";
import { getHotelById } from "../../services/Hotel/Hotel";
import RatingComponent from "../../components/Rating/RatingComponent";
import Comments from "../../components/Comment/Comment";
import ImageCarousel from "../../components/Carousel/ImageCarousel";

function HotelDetail() {
    const { id } = useParams(); // Lấy id từ URL
    const [hotelDetail, setHotelDetail] = useState(null); // State để lưu thông tin chi tiết

    useEffect(() => {
        // Fetch hotel details từ API
        const fetchHotelById = async () => {
            try {
                const response = await getHotelById(id);
                setHotelDetail(response.data); // Set dữ liệu vào state
            } catch (error) {
                console.error("Error fetching hotel detail:", error);
            }
        };
        fetchHotelById();
    }, [id]);

    if (!hotelDetail) {
        return <Typography variant="h6">Đang tải dữ liệu...</Typography>;
    }

    return (
        <div className="p-4">
            <Typography variant="h4" component="h1" gutterBottom>
                {hotelDetail.name} - {hotelDetail.address.city}, {hotelDetail.address.province}
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {/* Sử dụng ImageCarousel để hiển thị hình ảnh khách sạn */}
                    <ImageCarousel images={hotelDetail.images} altText={hotelDetail.name} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Mô Tả
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {hotelDetail.description}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Tiện Ích
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {hotelDetail.amenities.join(", ")}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Đánh Giá
                        </Typography>
                        <RatingComponent reviews={hotelDetail.reviews} />

                        <Typography variant="h6" gutterBottom>
                            Liên Hệ
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Điện thoại:</strong> {hotelDetail.phoneNumber}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Facebook:</strong>{" "}
                            <a href={hotelDetail.facebookLink} target="_blank" rel="noopener noreferrer">
                                {hotelDetail.facebookLink}
                            </a>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Instagram:</strong>{" "}
                            <a href={hotelDetail.instagramLink} target="_blank" rel="noopener noreferrer">
                                {hotelDetail.instagramLink}
                            </a>
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>

            <div className="mt-4">
                <Comments comments={hotelDetail.reviews} />
            </div>

            <Link className="btn btn-primary" to={`/hotel`}>
                Quay lại danh sách
            </Link>
        </div>
    );
}

export default HotelDetail;
