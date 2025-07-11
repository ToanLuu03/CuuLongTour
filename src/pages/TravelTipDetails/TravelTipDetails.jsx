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
    Avatar,
    Button,
    IconButton,
    Stack,
    Paper,
    Fade,
    Skeleton
} from '@mui/material';
import {
    Star,
    TravelExplore,
    PlayArrow,
    Visibility
} from '@mui/icons-material';
import { get_travelTipById } from "../../services/TravelTip/TravelTip";
import ReactPlayer from 'react-player';
import ImageCarousel from '../../components/Carousel/ImageCarousel';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "'Poppins', sans-serif",
    },
});

function TravelTipDetails() {
    const { id } = useParams();
    const [travelTip, setTravelTip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
            <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 3 }}>
                <Container maxWidth="md">
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
                        <Box display="flex" alignItems="center" gap={2} mb={3}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="rectangular" width={120} height={32} />
                        </Box>
                        <Skeleton variant="text" width="80%" height={48} />
                        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 3 }} />
                        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
                    </Paper>
                </Container>
            </Box>
        );
    }

    if (error) {
        return (

            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        borderRadius: 3,
                        border: '1px solid #fee2e2'
                    }}
                >
                    <Typography variant="h5" color="error" gutterBottom sx={{ fontWeight: 600 }}>
                        Loading failed
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {error}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Reload
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Fade in timeout={500}>
                <Box sx={{ bgcolor: '#f8fafc', minHeight: '1.2k' }}>

                    <Container maxWidth="950px" sx={{ py: 1, maxWidth: 1000 }}>
                        {/* Hero Section */}
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                overflow: 'hidden',
                                mb: 2,
                                border: '1px solid #e5e7eb'
                            }}
                        >
                            <Box sx={{ p: 4 }}>
                                {/* Meta information */}
                                

                                {/* Title and description */}
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 700,
                                        lineHeight: 1.3,
                                        color: '#1f2937',
                                        mb: 2
                                    }}
                                >
                                    {travelTip.title}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#6b7280',
                                        lineHeight: 1.6,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {travelTip.description}
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Content sections */}
                        <Stack spacing={3}>
                            {travelTip.content && Array.isArray(travelTip.content) && travelTip.content.map((item, index) => (
                                <Paper
                                    key={index}
                                    elevation={0}
                                    sx={{
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        border: '1px solid #e5e7eb'
                                    }}
                                >
                                    <Box sx={{ p: 4 }}>

                                        {/* Text Content */}
                                        {item.type === 'text' && (
                                            <Box>
                                                {item.textTitle && (
                                                    <Typography
                                                        variant="h5"
                                                        gutterBottom
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: '#1f2937',
                                                            mb: 3,
                                                            position: 'relative',
                                                            '&::before': {
                                                                content: '""',
                                                                position: 'absolute',
                                                                left: -16,
                                                                top: 0,
                                                                bottom: 0,
                                                                width: 4,
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
                                                            lineHeight: 1.7,
                                                            fontSize: '1rem',
                                                            color: '#374151',
                                                            mb: 2,
                                                            '&:last-child': { mb: 0 }
                                                        }}
                                                    >
                                                        {text}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        )}

                                        {/* Image Content */}
                                        {item.type === 'image' && item.caption && item.image.length > 0 && (
                                            <Box>
                                                <Box
                                                    sx={{
                                                        borderRadius: 2,
                                                        overflow: 'hidden',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                                        mb: 3
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
                                                    color="text.secondary"
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
                                            <Box>
                                                <Box
                                                    sx={{
                                                        borderRadius: 2,
                                                        overflow: 'hidden',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                                        mb: 3,
                                                        position: 'relative'
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
                                                        color="text.secondary"
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
                                                        variant="h5"
                                                        gutterBottom
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: '#1f2937',
                                                            mb: 3,
                                                            position: 'relative',
                                                            '&::before': {
                                                                content: '""',
                                                                position: 'absolute',
                                                                left: -16,
                                                                top: 0,
                                                                bottom: 0,
                                                                width: 4,
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
                                                            lineHeight: 1.7,
                                                            fontSize: '1rem',
                                                            color: '#374151',
                                                            mb: 3
                                                        }}
                                                    >
                                                        {text}
                                                    </Typography>
                                                ))}

                                                {item.image && item.image.length > 0 && (
                                                    <Box sx={{ mb: 3 }}>
                                                        <Box
                                                            sx={{
                                                                borderRadius: 2,
                                                                overflow: 'hidden',
                                                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                                                mb: 2
                                                            }}
                                                        >
                                                            <ImageCarousel
                                                                images={item.image}
                                                                altText="Travel content"
                                                                widthImg="100%"
                                                                heightImg="400px"
                                                            />
                                                        </Box>
                                                        {item.caption && (
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
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
                                                    <Box>
                                                        <Box
                                                            sx={{
                                                                borderRadius: 2,
                                                                overflow: 'hidden',
                                                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                                                mb: 2
                                                            }}
                                                        >
                                                            <ReactPlayer
                                                                width="100%"
                                                                height="400px"
                                                                url={item.video}
                                                                controls={true}
                                                                light={true}
                                                                playIcon={
                                                                    <Box sx={{
                                                                        bgcolor: 'rgba(0,0,0,0.7)',
                                                                        borderRadius: '50%',
                                                                        width: 60,
                                                                        height: 60,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'
                                                                    }}>
                                                                        <PlayArrow sx={{ color: 'white', fontSize: 30 }} />
                                                                    </Box>
                                                                }
                                                            />
                                                        </Box>
                                                        {item.caption && (
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
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
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>

                    </Container>
                </Box>
            </Fade>
        </ThemeProvider>
    );
}

export default TravelTipDetails;