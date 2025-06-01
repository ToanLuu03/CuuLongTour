import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    IconButton,
    TextField,
    Typography,
    List,
    ListItem,
    Button,
    Paper,
    Chip,
    Avatar,
    CircularProgress
} from '@mui/material';
import {
    Chat as ChatIcon,
    Send as SendIcon,
    Close as CloseIcon,
    TravelExplore as TravelExploreIcon,
    Restaurant as RestaurantIcon,
    Hotel as HotelIcon,
    DirectionsCar as DirectionsCarIcon,
} from '@mui/icons-material';

const ChatBox = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [userPreferences, setUserPreferences] = useState({
        location: '',
        interest: '',
        budget: '',
        duration: '',
        companion: ''
    });
    const [step, setStep] = useState(-1);

    const questions = [
        {
            field: 'location',
            question: 'Which province in the Mekong Delta do you want to visit?',
            options: ['Can Tho', 'An Giang', 'Kien Giang', 'Tien Giang', 'Ben Tre', 'Soc Trang'],
            icon: <TravelExploreIcon />
        },
        {
            field: 'interest',
            question: 'What type of travel are you interested in?',
            options: ['Sightseeing', 'Cuisine', 'Resort', 'Culture'],
            icon: <RestaurantIcon />
        },
        {
            field: 'budget',
            question: 'What is your budget?',
            options: ['Under 1 million', '1-3 million', '3-5 million', 'Over 5 million'],
            icon: <HotelIcon />
        },
        {
            field: 'duration',
            question: 'How long do you plan to travel?',
            options: ['1 day', '2-3 days', '4-7 days', 'Over 1 week'],
            icon: <DirectionsCarIcon />
        },
        {
            field: 'companion',
            question: 'Who are you traveling with?',
            options: ['Alone', 'Family', 'Friends', 'Couple'],
            icon: <Avatar sx={{ width: 24, height: 24 }} />
        }
    ];

    const introMessage = `Welcome to Mekong Travel Assistant! 🌿

I can help you plan your perfect trip to the Mekong Delta. Just answer a few short questions and I will recommend:
- Interesting attractions
- Local specialties
- Suitable accommodation
- Transportation
- Useful travel tips

Get started by clicking the button below!`;

    useEffect(() => {
        if (isChatOpen && messages.length === 0) {
            setStep(-1);
            addBotMessage(introMessage);
        }
    }, [isChatOpen]);

    const handleToggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            setMessages([]);
            setStep(-1);
            setUserPreferences({
                location: '',
                interest: '',
                budget: '',
                duration: '',
                companion: ''
            });
        }
    };

    const startRecommendation = () => {
        setStep(0);
        setTimeout(() => {
            setStep(1);
            addBotMessage(questions[0].question);
        }, 500);
    };

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'MekongBot', text, isQuestion: true }]);
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'You', text }]);
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        addUserMessage(message);

        if (step === 0 || step === -1) {
            startRecommendation();
        } else if (step > 0 && step <= 5) {
            const currentField = questions[step - 1].field;
            setUserPreferences(prev => ({
                ...prev,
                [currentField]: message
            }));

            if (step < 5) {
                setStep(step + 1);
                setTimeout(() => {
                    addBotMessage(questions[step].question);
                }, 500);
            } else {
                generateRecommendation();
            }
        }

        setMessage('');
    };

    const generateRecommendation = async () => {
        setIsTyping(true);
        addBotMessage('Creating travel recommendations tailored to you...');
        try {
            const prompt = `I am a tourist with the following information:

Location: ${userPreferences.location || 'unknown'}

Interests: ${userPreferences.interest || 'unknown'}

Budget: ${userPreferences.budget || 'unknown'}

Duration: ${userPreferences.duration || 'unknown'}

Travel companion: ${userPreferences.companion || 'unknown'}

Please propose a detailed travel plan in the Mekong Delta with:

1. Suitable attractions

2. Local restaurants/cuisine

3. Accommodation

4. Transportation

5. Useful travel tips

Answer in English, concise, easy to understand, divided into clear categories.`;

            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD2pKxRF5FS1oDLYtVWIG4qHQ1mTUXHDGA',
                {
                    contents: [{ parts: [{ text: prompt }] }],
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const fullText = response.data.candidates[0].content.parts[0].text;

            await typeWriterEffect(fullText, 10);
            setStep(6);
        } catch (error) {
            console.error('Error connecting to Gemini AI:', error);
            addBotMessage('Sorry, I had trouble creating the suggestion. Please try again later.');
        } finally {
            setIsTyping(false);
        }
    };

    const renderQuickOptions = () => {
        if (step === -1) {
            return (
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#2e7d32',
                            '&:hover': { bgcolor: '#1b5e20' },
                            borderRadius: '20px',
                            px: 3,
                            py: 1
                        }}
                        onClick={startRecommendation}
                        startIcon={<TravelExploreIcon />}
                    >
                        Start the experience
                    </Button>
                </Box>
            );
        }

        if (step > 0 && step <= 5) {
            const currentQuestion = questions[step - 1];
            return (
                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {currentQuestion.options.map((option, index) => (
                        <Chip
                            key={index}
                            label={option}
                            onClick={() => {
                                setMessage(option);
                                handleSendMessage();
                            }}
                            sx={{
                                cursor: 'pointer',
                                bgcolor: '#e8f5e9',
                                color: '#2e7d32',
                                '&:hover': { bgcolor: '#c8e6c9' }
                            }}
                        />
                    ))}
                </Box>
            );
        }

        return null;
    };
    const typeWriterEffect = (text, delay = 30) => {
        return new Promise((resolve) => {
            let i = 0;
            const tempText = { sender: 'MekongBot', text: '', isRecommendation: true };

            setMessages((prev) => [...prev, tempText]);

            const interval = setInterval(() => {
                i++;
                setMessages((prev) => {
                    const last = prev[prev.length - 1];
                    const updated = [...prev];
                    updated[prev.length - 1] = {
                        ...last,
                        text: text.substring(0, i)
                    };
                    return updated;
                });

                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, delay);
        });
    };

    return (
        <Box position="fixed" bottom={16} right={16} zIndex={1000}>
            {!isChatOpen ? (
                <Button
                    onClick={handleToggleChat}
                    sx={{
                        bgcolor: '#2e7d32',
                        '&:hover': { bgcolor: '#1b5e20' },
                        borderRadius: '50%',
                        minWidth: '60px',
                        height: '60px',
                        boxShadow: 3,
                        color: 'white'
                    }}
                >
                    <ChatIcon fontSize="large" />
                </Button>
            ) : (
                <Paper elevation={6} sx={{
                    width: 400,
                    height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #81c784'
                }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={2}
                        sx={{
                            bgcolor: '#2e7d32',
                            color: 'white',
                            borderBottom: '1px solid #81c784'
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <TravelExploreIcon sx={{ mr: 1, color: '#a5d6a7' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Mekong Travel Assistant
                            </Typography>
                        </Box>
                        <IconButton onClick={handleToggleChat} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box flex={1} overflow="auto" p={2} sx={{ bgcolor: '#f1f8e9' }}>
                        <List sx={{ pt: 0 }}>
                            {messages.map((msg, index) => (
                                <React.Fragment key={index}>
                                    <ListItem alignItems="flex-start" sx={{
                                        flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row',
                                        alignItems: 'flex-start',
                                        pb: 1
                                    }}>
                                        <Avatar sx={{
                                            bgcolor: msg.sender === 'You' ? '#2e7d32' : '#81c784',
                                            width: 36,
                                            height: 36,
                                            mr: msg.sender === 'You' ? 0 : 1,
                                            ml: msg.sender === 'You' ? 1 : 0,
                                            fontWeight: 'bold'
                                        }}>
                                            {msg.sender === 'You' ? 'Bạn' : 'MT'}
                                        </Avatar>
                                        <Paper elevation={0} sx={{
                                            p: 1.5,
                                            maxWidth: '80%',
                                            bgcolor: msg.sender === 'You' ? '#c8e6c9' : 'white',
                                            color: 'text.primary',
                                            borderRadius: msg.sender === 'You' ?
                                                '18px 4px 18px 18px' : '4px 18px 18px 18px',
                                            border: '1px solid #e8f5e9',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}>
                                            <Typography variant="body1" whiteSpace="pre-wrap" sx={{
                                                lineHeight: 1.6,
                                                color: msg.sender === 'You' ? '#1b5e20' : 'inherit'
                                            }}>
                                                {msg.text}
                                            </Typography>
                                        </Paper>
                                    </ListItem>
                                    {msg.isQuestion && renderQuickOptions()}
                                </React.Fragment>
                            ))}
                            {isTyping && (
                                <ListItem alignItems="flex-start">
                                    <Avatar sx={{
                                        bgcolor: '#81c784',
                                        width: 36,
                                        height: 36,
                                        mr: 1,
                                        fontWeight: 'bold'
                                    }}>
                                        MT
                                    </Avatar>
                                    <Paper elevation={0} sx={{
                                        p: 1.5,
                                        maxWidth: '80%',
                                        bgcolor: 'white',
                                        borderRadius: '4px 18px 18px 18px',
                                        border: '1px solid #e8f5e9'
                                    }}>
                                        <Box display="flex" alignItems="center">
                                            <CircularProgress size={16} sx={{ mr: 1, color: '#2e7d32' }} />
                                            <Typography variant="body2" sx={{ color: '#2e7d32' }}>
                                                MekongBot is recommending
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </ListItem>
                            )}
                        </List>
                    </Box>

                    <Box p={2} sx={{
                        borderTop: '1px solid #c8e6c9',
                        bgcolor: 'white'
                    }}>
                        <Box display="flex" alignItems="center">
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder={
                                    step === -1 ? "Nhập lời chào để bắt đầu" :
                                        step === 0 ? "Nhấn nút bên dưới để bắt đầu" :
                                            questions[step - 1]?.question
                                }
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '24px',
                                        bgcolor: '#f1f8e9',
                                        '& fieldset': {
                                            borderColor: '#c8e6c9',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#81c784',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#2e7d32',
                                        },
                                    }
                                }}
                                disabled={step === 0}
                            />
                            <IconButton
                                onClick={handleSendMessage}
                                sx={{
                                    ml: 1,
                                    bgcolor: '#2e7d32',
                                    color: 'white',
                                    '&:hover': { bgcolor: '#1b5e20' },
                                    '&:disabled': { bgcolor: '#e8f5e9', color: '#a5d6a7' }
                                }}
                                disabled={!message.trim() || step === 0}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                        {step === 0 && (
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#2e7d32',
                                        '&:hover': { bgcolor: '#1b5e20' },
                                        borderRadius: '20px',
                                        px: 3,
                                        py: 1,
                                        textTransform: 'none',
                                        fontWeight: 'bold'
                                    }}
                                    onClick={startRecommendation}
                                    startIcon={<TravelExploreIcon />}
                                >
                                    Bắt đầu khảo sát du lịch
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default ChatBox;