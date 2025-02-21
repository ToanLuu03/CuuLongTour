import { get_5_travel_tip } from "../../services/TravelTip/TravelTip";
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SeeMore_Button from "../SeeMore_Button/SeeMore_Button";

function TravelTip() {
    const [traveltip, setTravelTip] = useState([]);
    const scrollRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await get_5_travel_tip();
            console.log("object", data)
            setTravelTip(data);

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
            <Box sx={{ my: 6, px: 4, position: "relative" }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600, mb: 4 }}>
                    Travel Tip
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
                        {traveltip.map((travel) => (
                            <Card
                                key={travel._id}
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
                                    image={travel.image[0]}
                                    alt={travel.title}
                                    sx={{
                                        objectFit: "cover", borderRadius: "16px 16px 0 0",
                                    }}
                                />
                                <CardContent >
                                    <Typography
                                        style={{ marginBottom: 16 }}
                                        variant="h6"
                                        sx={{ fontSize: 20, fontWeight: 600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                                        title={travel.title}
                                    >
                                        {travel.title}
                                    </Typography>

                                    <Typography
                                        style={{ marginBottom: 16 }}
                                        variant="h6"

                                        sx={{
                                            fontSize: 14,
                                            fontWeight: 200,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxHeight: "3em",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical"
                                        }}
                                        title={travel.description}
                                    >
                                        {travel.description}
                                    </Typography>

                                    <Typography
                                      
                                        variant="h6"
                                        sx={{ 
                                            fontSize: 16, 
                                            fontWeight: 200, 
                                            overflow: "hidden", 
                                            whiteSpace: "nowrap", 
                                            textOverflow: "ellipsis" 
                                        }}
                                        title={travel.location}
                                    >
                                        {travel.location}
                                    </Typography>


                                    <SeeMore_Button style={{ paddingBottom: 10 }} link={`/travelTip/${travel._id}`} />


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
export default TravelTip;
