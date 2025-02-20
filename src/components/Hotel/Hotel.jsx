import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { get_5_Hotels } from "../../services/Hotel/Hotel";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SeeMore_Button from "../SeeMore_Button/SeeMore_Button";

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
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };
    return (
        <div>
            {/* Hotels */}
            <Box sx={{ my: 6, px: 4, position: "relative" }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600, mb: 4 }}>
                    Recommended Hotels
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    {/* Nút điều hướng trái */}
                    <IconButton
                        onClick={() => scroll("left")}
                        sx={{
                            position: "absolute",
                            left: 0,
                            zIndex: 10,
                            backgroundColor: "white",
                            boxShadow: 2,
                            "&:hover": { backgroundColor: "grey.200" },
                            transition: "all 0.3s",
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <Box
                        ref={scrollRef}
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            gap: 3,
                            py: 2,
                            px: 5,
                            "::-webkit-scrollbar": { display: "none" },
                            scrollBehavior: "smooth",
                        }}
                    >
                        {hotels.map((hotel) => (
                            <Card
                                key={hotel._id}
                                sx={{
                                    minWidth: 300,
                                    maxWidth: 400,
                                    flexShrink: 0,
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    width={"50%"}
                                    image={hotel.images[0]}
                                    alt={hotel.name}
                                    sx={{
                                        objectFit: "cover", borderRadius: "16px 16px 0 0",
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {hotel.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" paragraph>
                                        {hotel.address.street}, {hotel.address.city}, {hotel.address.province}, {hotel.address.country}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" paragraph>
                                        Price: {hotel.pricePerNight.toLocaleString()} VND per night
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {hotel.description}
                                    </Typography>
                                    <SeeMore_Button link={`/hotel/hotel_details/${hotel._id}`} />
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    {/* Nút điều hướng phải */}
                    <IconButton
                        onClick={() => scroll("right")}
                        sx={{
                            position: "absolute",
                            right: 0,
                            zIndex: 10,
                            backgroundColor: "white",
                            boxShadow: 2,
                            "&:hover": { backgroundColor: "grey.200" },
                            transition: "all 0.3s",
                        }}
                    >
                        <ChevronRight />
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
}

export default Hotel