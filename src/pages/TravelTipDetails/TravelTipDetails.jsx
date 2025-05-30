import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Typography, 
    Box, 
    CircularProgress, 
    Card, 
    CardContent, 
    CardMedia,
    Container,
    Chip,
    Divider,
    useTheme,
    alpha
} from '@mui/material';
import { 
    LocationOn, 
    AccessTime, 
    Star,
    TravelExplore 
} from '@mui/icons-material';
import { get_travelTipById } from "../../services/TravelTip/TravelTip";
import ReactPlayer from 'react-player';
import ImageCarousel from '../../components/Carousel/ImageCarousel';

function TravelTipDetails() {
    const { id } = useParams();
    const [travelTip, setTravelTip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchTravelTipDetails = async () => {
            try {
                const response = await get_travelTipById(id);
                setTravelTip(response.data);
            } catch (error) {
                console.error('Error fetching travel tip details:', error);
                setError("Error: Unable to fetch Travel Tip data");
            } finally {
                setLoading(false);
            }
        };

        fetchTravelTipDetails();
    }, [id]);

    if (loading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="60vh"
                sx={{ bgcolor: '#f8f9fa' }}
            >
                <Box textAlign="center">
                    <CircularProgress size={50} thickness={4} />
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                        Đang tải thông tin...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        Không thể tải thông tin
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {error}
                    </Typography>
                </Card>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Card 
                    elevation={3}
                    sx={{ 
                        borderRadius: 3,
                        overflow: 'hidden',
                        backgroundColor: 'white'
                    }}
                >
                    {/* Hero Header Section */}
                    <Box 
                        sx={{ 
                            position: 'relative',
                            color: 'black',
                            p: 4
                        }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <TravelExplore sx={{ fontSize: 32 }} />
                                <Chip 
                                    label="Travel Guide" 
                                    variant="outlined"
                                    sx={{ 
                                        color: 'white',
                                        borderColor: 'rgba(255,255,255,0.5)',
                                        fontWeight: 'bold'
                                    }} 
                                />
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Star sx={{ color: '#FFD700', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Recommended
                                </Typography>
                            </Box>
                        </Box>

                        <Typography 
                            variant="h3" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 'bold',
                                lineHeight: 1.2,
                             
                            }}
                        >
                            {travelTip.title}
                        </Typography>

                        <Typography 
                            variant="h6" 
                            sx={{ 
                                opacity: 0.95,
                                lineHeight: 1.5,
                                maxWidth: '100%',
                                fontWeight: 400
                            }}
                        >
                            {travelTip.description}
                        </Typography>
                    </Box>

                    {/* Main Content */}
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ p: 4 }}>
                            {travelTip.content && Array.isArray(travelTip.content) && travelTip.content.map((item, index) => (
                                <Box key={index} sx={{ mb: index < travelTip.content.length - 1 ? 5 : 0 }}>
                                    
                                    {/* Text Content */}
                                    {item.type === 'text' && (
                                        <Box>
                                            {item.textTitle && (
                                                <Typography 
                                                    variant="h4" 
                                                    gutterBottom 
                                                    sx={{ 
                                                        fontWeight: 700,
                                                        color: theme.palette.text.primary,
                                                        mb: 3,
                                                        position: 'relative',
                                                        '&::after': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            bottom: -8,
                                                            left: 0,
                                                            width: 60,
                                                            height: 3,
                                                            backgroundColor: theme.palette.primary.main,
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                >
                                                    {item.textTitle}
                                                </Typography>
                                            )}
                                            {item.text && item.text.map((text, idx) => (
                                                <Typography 
                                                    variant="body1" 
                                                    paragraph 
                                                    key={idx}
                                                    sx={{ 
                                                        lineHeight: 1.8,
                                                        fontSize: '1.1rem',
                                                        color: theme.palette.text.primary,
                                                        mb: 2.5,
                                                        textAlign: 'justify'
                                                    }}
                                                >
                                                    {text}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}

                                    {/* Image Content */}
                                    {item.type === 'image' && item.caption && item.image.length > 0 && (
                                        <Box sx={{ mb: 4 }}>
                                            <Box 
                                                sx={{ 
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                    mb: 2
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={item.image[0]}
                                                    alt={item.caption}
                                                    sx={{
                                                        width: '100%',
                                                        height: '500px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </Box>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary" 
                                                sx={{ 
                                                    fontStyle: 'italic',
                                                    textAlign: 'center',
                                                    px: 2
                                                }}
                                            >
                                                {item.caption}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Video Content */}
                                    {item.type === 'video' && item.video && (
                                        <Box sx={{ mb: 4 }}>
                                            <Box 
                                                sx={{ 
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                    mb: 2
                                                }}
                                            >
                                                <ReactPlayer
                                                    width="100%"
                                                    height="500px"
                                                    url={item.video}
                                                    title={item.caption}
                                                    controls={true}
                                                />
                                            </Box>
                                            {item.caption && (
                                                <Typography 
                                                    variant="body2" 
                                                    color="textSecondary"
                                                    sx={{ 
                                                        fontStyle: 'italic',
                                                        textAlign: 'center',
                                                        px: 2
                                                    }}
                                                >
                                                    {item.caption}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}

                                    {/* Mixed Content */}
                                    {item.type === 'mixed' && (
                                        <Box>
                                            {item.textTitle && (
                                                <Typography 
                                                    variant="h4" 
                                                    gutterBottom 
                                                    sx={{ 
                                                        fontWeight: 700,
                                                        color: theme.palette.text.primary,
                                                        mb: 3,
                                                        position: 'relative',
                                                        '&::after': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            bottom: -8,
                                                            left: 0,
                                                            width: 60,
                                                            height: 3,
                                                            backgroundColor: theme.palette.primary.main,
                                                            borderRadius: 2
                                                        }
                                                    }}
                                                >
                                                    {item.textTitle}
                                                </Typography>
                                            )}

                                            {item.text && item.text.map((text, idx) => (
                                                <Typography 
                                                    variant="body1" 
                                                    paragraph 
                                                    key={idx}
                                                    sx={{ 
                                                        lineHeight: 1.8,
                                                        fontSize: '1.1rem',
                                                        mb: 2.5,
                                                        textAlign: 'justify'
                                                    }}
                                                >
                                                    {text}
                                                </Typography>
                                            ))}

                                            {item.image && item.image.length > 0 && (
                                                <Box sx={{ mb: 4 }}>
                                                    <Box 
                                                        sx={{ 
                                                            borderRadius: 2,
                                                            overflow: 'hidden',
                                                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                            mb: 2
                                                        }}
                                                    >
                                                        <ImageCarousel
                                                            images={item.image}
                                                            altText="Travel content"
                                                            widthImg="100%"
                                                            heightImg="500px"
                                                        />
                                                    </Box>
                                                    {item.caption && (
                                                        <Typography 
                                                            variant="body2" 
                                                            color="textSecondary"
                                                            sx={{ 
                                                                fontStyle: 'italic',
                                                                textAlign: 'center',
                                                                px: 2
                                                            }}
                                                        >
                                                            {item.caption}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            )}

                                            {item.video && (
                                                <Box sx={{ mb: 4 }}>
                                                    <Box 
                                                        sx={{ 
                                                            borderRadius: 2,
                                                            overflow: 'hidden',
                                                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                            mb: 2
                                                        }}
                                                    >
                                                        <ReactPlayer
                                                            width="100%"
                                                            height="500px"
                                                            url={item.video}
                                                            controls={true}
                                                        />
                                                    </Box>
                                                    {item.caption && (
                                                        <Typography 
                                                            variant="body2" 
                                                            color="textSecondary"
                                                            sx={{ 
                                                                fontStyle: 'italic',
                                                                textAlign: 'center',
                                                                px: 2
                                                            }}
                                                        >
                                                            {item.caption}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            )}
                                        </Box>
                                    )}

                                    {/* Divider between content sections */}
                                    {index < travelTip.content.length - 1 && (
                                        <Divider sx={{ my: 4, opacity: 0.3 }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default TravelTipDetails;