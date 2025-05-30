import { Box, Card, CardContent, CardMedia, Typography, IconButton, Stack } from "@mui/material";
import { useEffect, useState, useRef } from "react"; // Thêm useRef
import SeeMore_Button from "../SeeMore_Button/SeeMore_Button";
import { get_5_Hotels } from "../../services/Hotel/Hotel";
import { ChevronLeft, ChevronRight, LocationOn } from "@mui/icons-material";

function Hotel() {
    const [hotels, setHotels] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await get_5_Hotels();
            setHotels(data);
        };
        fetchData();
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.offsetWidth;
            const scrollLeft = direction === 'left'
                ? current.scrollLeft - scrollAmount
                : current.scrollLeft + scrollAmount;

            current.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
         <Box sx={{
            mt: 0,
            mb: 5,
            px: {
                md: '70px'
            },
            position: "relative",
            maxWidth: "1400px",
            mx: "auto"
        }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    mb: 5,
                    color: "#1A3C34",
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                Recommended Hotels
            </Typography>

            <Box sx={{ position: "relative" }}>
                <IconButton
                    onClick={() => scroll('left')}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        zIndex: 2,
                        
                        left: { xs: -16, sm: -50 },
                    }}
                >
                    <ChevronLeft sx={{ fontSize: 28, color: "#1A3C34" }} />
                </IconButton>

                <Box
                    ref={scrollRef}
                    sx={{
                        display: "flex",
                        gap: 2, // 16px
                        overflowX: "hidden",
                        scrollBehavior: "smooth",
                        "&::-webkit-scrollbar": { display: "none" },
                        "-ms-overflow-style": "none",
                        "scrollbar-width": "none",
                        px: 1, // 8px
                        py: "0px", // Adding padding top and bottom
                    }}
                >
                    {hotels.map((hotel) => (
                        <Card
                            key={hotel._id}
                            sx={{
                                minWidth: { xs: 260, sm: 280, md: 300 },
                                maxWidth: { xs: 260, sm: 280, md: 300 },
                                flexShrink: 0,
                                borderRadius: "20px",
                                boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                                overflow: "hidden",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                                },
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    image={hotel.images[0]}
                                    alt={hotel.name}
                                    sx={{
                                        height: 180,
                                        width: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: "50%",
                                        background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                                    }}
                                />
                            </Box>

                            <CardContent sx={{ px: 3, py: 2, bgcolor: "#F9FAFB" }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 600,
                                        color: "#1A3C34",
                                        mb: 1.5,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                    title={hotel.name}
                                >
                                    {hotel.name}
                                </Typography>

                                <Stack spacing={1.5}>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            fontSize: 14,
                                            color: "#4B5EAA",
                                        }}
                                        title={`${hotel.address.street}, ${hotel.address.city}, ${hotel.address.province}, ${hotel.address.country}`}
                                    >
                                        <LocationOn sx={{ fontSize: 18 }} />
                                        {hotel.address.street}, {hotel.address.city}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            color: "#1A3C34",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {hotel.pricePerNight.toLocaleString()} VND / night
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            color: "#666",
                                            lineHeight: 1.5,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            mb: 1,
                                        }}
                                        title={hotel.description}
                                    >
                                        {hotel.description}
                                    </Typography>
                                </Stack>

                                <SeeMore_Button
                                    style={{
                                        padding: "8px 16px",
                                        fontSize: 14,
                                        marginTop: "16px",
                                        width: "100%",
                                        backgroundColor: "#1A3C34",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#142B25",
                                        }
                                    }}
                                    link={`/hotel/hotel_details/${hotel._id}`}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <IconButton
                    onClick={() => scroll('right')}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: { xs: -16, sm: -50 },
                        zIndex: 2,
                        transform: "translateY(-50%)",
            
                    }}
                >
                    <ChevronRight sx={{ fontSize: 28, color: "#1A3C34" }} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Hotel;