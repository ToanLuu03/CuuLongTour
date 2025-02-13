import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress, Card, CardContent, Divider, CardMedia } from '@mui/material';
import { get_travelTipById } from "../../services/TravelTip/TravelTip"; // Giả sử bạn có service gọi API
import ReactPlayer from 'react-player';
import ImageCarousel from '../../components/Carousel/ImageCarousel';

function TravelTipDetails() {
    const { id } = useParams(); // Lấy ID từ URL
    const [travelTip, setTravelTip] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    // Lấy dữ liệu chi tiết khi component được render
    useEffect(() => {
        const fetchTravelTipDetails = async () => {
            try {
                const response = await get_travelTipById(id); // Gọi API để lấy chi tiết TravelTip
                setTravelTip(response.data);
            } catch (error) {
                console.error('Error fetching travel tip details:', error);
                setError("Error: Unable to fetch Travel Tip data");
            } finally {
                setLoading(false);
            }
        };

        fetchTravelTipDetails();
    }, [id]); // Chạy lại mỗi khi `id` thay đổi

    if (loading) {
        return (
            <div className="p-4">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Box className="p-4">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }
    return (
        <Box sx={{
            padding: 3,
            maxWidth: '85%',   // Giới hạn chiều rộng tối đa của văn bản
            marginX: 'auto',
        }}>
            <Card sx={{ marginBottom: 3 }}>
                <CardContent>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {travelTip.title}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                        {travelTip.description}
                    </Typography>
                </CardContent>
            </Card>

            {/* Hiển thị các nội dung trong content */}
            {travelTip.content && Array.isArray(travelTip.content) && travelTip.content.map((item, index) => (
                <Box key={index} sx={{ marginBottom: 3 }}>
                    {/* Text Content */}
                    {item.type === 'text' && (
                        <>
                            {item.textTitle && (
                                <Typography variant="h4" paragraph sx={{ fontWeight: 'bold' }}>
                                    {item.textTitle}
                                </Typography>
                            )}
                            {item.text && item.text.map((text, idx) => (
                                <Typography variant="body2" paragraph key={idx}>
                                    {text}
                                </Typography>
                            ))}
                        </>
                    )}
                    {/* Image Content */}
                    {item.type === 'image' && item.caption && item.image.length > 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <CardMedia
                                component="img"
                                image={item.image[0]}
                                alt={item.caption}
                                sx={{
                                    borderRadius: 2,
                                    maxWidth: '70%',
                                    height: '400px',
                                    boxShadow: 2,
                                }}
                            />
                            {/* Hiển thị caption dưới hình ảnh */}
                            <Typography variant="caption" paragraph color="textSecondary" align="center">
                                {item.caption}
                            </Typography>
                        </Box>
                    )}



                    {/* Video Content */}
                    {item.type === 'video' && item.video && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                            <ReactPlayer
                                width="50%"
                                height="400px"
                                url={item.video}
                                title={item.caption}
                                controls={true}
                            />

                            {/* Hiển thị caption nếu có */}
                            {item.caption && (
                                <Typography variant="caption" paragraph color="textSecondary" align="center">
                                    {item.caption}
                                </Typography>
                            )}
                        </Box>
                    )}
                    {item.type === 'mixed' && (
                        <Box>
                            {item.textTitle && (
                                <Typography variant="h4" paragraph sx={{ fontWeight: 'bold' }}>
                                    {item.textTitle}
                                </Typography>
                            )}
                            {/* Hiển thị văn bản nếu có */}
                            {item.text && item.text.map((text, idx) => (
                                <Typography variant="body2" paragraph key={idx}>
                                    {text}
                                </Typography>
                            ))}

                            {/* Hiển thị hình ảnh và caption nếu có */}
                            {item.image && item.image.length > 0 && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <ImageCarousel
                                            images={item.image} // Dữ liệu hình ảnh dưới dạng mảng
                                            altText="Image content"
                                            widthImg="70%"
                                            heightImg="400px"
                                        />
                                    </Box>

                                    {/* Hiển thị caption nếu có */}
                                    {item.caption && (
                                        <Typography variant="caption" paragraph color="textSecondary" align="center">
                                            {item.caption}
                                        </Typography>
                                    )}
                                </Box>
                            )}

                            {/* Hiển thị video và caption nếu có */}
                            {item.video && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                                    <ReactPlayer
                                        width="50%"
                                        height="400px"
                                        url={item.video}
                                        controls={true}
                                    />

                                    {/* Hiển thị caption nếu có */}
                                    {item.caption && (
                                        <Typography variant="caption" paragraph color="textSecondary" align="center">
                                            {item.caption}
                                        </Typography>
                                    )}
                                </Box>
                            )}

                        </Box>
                    )}
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                </Box>
            ))}

        </Box>
    );
}

export default TravelTipDetails;
