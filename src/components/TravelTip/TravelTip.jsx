import { Box, Card, CardContent, CardMedia, Typography, IconButton, Stack } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import SeeMore_Button from "../SeeMore_Button/SeeMore_Button";
import { get_5_travel_tip } from "../../services/TravelTip/TravelTip";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

function TravelTip() {
    const [traveltips, setTravelTips] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await get_5_travel_tip();
            setTravelTips(data);
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
                Explore Our Travel Tips
            </Typography>

            <Box sx={{ position: "relative" }}>
                <IconButton
                    onClick={() => scroll('left')}
                    sx={{
                        position: "absolute",
                        top: "45%",
                        zIndex: 2,
                        left: { xs: -16, sm: -45 },
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
                        py: "10px", // Adding padding top and bottom
                    }}
                >
                    {traveltips.map((travel) => (
                        <Card
                            key={travel._id}
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
                                    image={travel.image[0]}
                                    alt={travel.title}
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
                                    title={travel.title}
                                >
                                    {travel.title}
                                </Typography>

                                <Stack spacing={1.5}>
                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            color: "#4B5EAA",
                                            lineHeight: 1.5,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            mb: 2,
                                        }}
                                        title={travel.description}
                                    >
                                        {travel.description}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 13,
                                            color: "#6B7280",
                                            fontWeight: 500,
                                            mb: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <span role="img" aria-label="location">📍</span>
                                        {travel.location}
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
                                    link={`/blog/${travel._id}`}
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
                        right: { xs: -16, sm: -45 },
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

export default TravelTip;