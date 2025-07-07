import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
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
    TravelExplore as TravelExploreIcon,
    Restaurant as RestaurantIcon,
    Hotel as HotelIcon,
    DirectionsCar as DirectionsCarIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const TravelRecommendation = ({ messages, setMessages, isTyping, setIsTyping }) => {
    const [userPreferences, setUserPreferences] = useState({
        location: '',
        interest: '',
        budget: '',
        duration: '',
        companion: ''
    });
    const [step, setStep] = useState(0);

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
        if (messages.length === 0) {
            setStep(0);
            addBotMessage(introMessage);
        }
    }, [messages.length]);

    const startRecommendation = () => {
        setStep(1);
        addBotMessage(questions[0].question);
    };

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'MekongBot', text, isQuestion: true }]);
    };

    const handleSendMessage = async (message) => {
        if (!message.trim()) return;

        addUserMessage(message);

        if (step === 0) {
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
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'You', text }]);
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
        if (step === 0) {
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
                            onClick={() => handleSendMessage(option)}
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
        <>
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
                                {msg.sender === 'You' ? 'Y' : 'M'}
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
                            M
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
                                    MekongBot is recommending...
                                </Typography>
                            </Box>
                        </Paper>
                    </ListItem>
                )}
            </List>
        </>
    );
};
TravelRecommendation.propTypes = {
    messages: PropTypes.array.isRequired,
    setMessages: PropTypes.func.isRequired,
    isTyping: PropTypes.bool.isRequired,
    setIsTyping: PropTypes.func.isRequired,
    initialized: PropTypes.bool
};
export default TravelRecommendation;