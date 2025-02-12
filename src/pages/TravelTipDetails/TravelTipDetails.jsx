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
        <Box sx={{ padding: 3 }}>
            <Card sx={{ marginBottom: 3 }}>
                <CardContent>
                    <Typography variant="h3" gutterBottom>{travelTip.title}</Typography>
                    <Typography variant="body1" paragraph>{travelTip.description}</Typography>
                </CardContent>
            </Card>

            {/* Hiển thị các nội dung trong content */}
            {travelTip.content.map((item, index) => (
                <Box key={index} sx={{ marginBottom: 3 }}>
                    {/* Text Content */}
                    {item.type === 'text' && <Typography variant="body2" paragraph>{item.data}</Typography>}

                    {/* Image Content */}
                    {item.type === 'image' && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CardMedia
                                component="img"
                                image={item.data}
                                alt={item.caption}
                                sx={{
                                    borderRadius: 2,
                                    maxWidth: '50%',
                                    height: 'auto',
                                    boxShadow: 2,
                                }}
                            />
                        </Box>
                    )}

                    {/* Video Content */}
                    {item.type === 'video' && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <ReactPlayer
                                width="50%"
                                height="400px"
                                url={item.data}
                                title={item.caption}
                                controls={true}
                            />
                        </Box>
                    )}

                    {/* Mixed Content */}
                    {item.type === 'mixed' && (
                        <Box>
                            <ImageCarousel images={item.image} altText="images" widthImg="50%" />

                            <Typography variant="body2" paragraph align="center">{item.text}</Typography>

                            {item.video && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                                    <ReactPlayer
                                        width="50%"
                                        height="400px"
                                        url={item.video}
                                        controls={true}
                                    />
                                </Box>
                            )}
                            <Typography variant="caption" paragraph color="textSecondary" align="center">{item.caption}</Typography>
                        </Box>
                    )}

                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                </Box>
            ))}
        </Box>
    );
}

export default TravelTipDetails;
