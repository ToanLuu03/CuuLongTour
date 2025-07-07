import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    IconButton,
    TextField,
    Typography,
    List,
    ListItem,
    Paper,
    Avatar,
    CircularProgress
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const ChatBotCom = ({ messages, setMessages, isTyping, setIsTyping, initialized }) => {
    const [message, setMessage] = useState('');

    const introMessage = `Hello! I'm your Mekong Delta AI assistant. Ask me anything about:
- Travel information
- Local culture
- Food recommendations
- Transportation
- Or anything else about the Mekong Delta!`;

    useEffect(() => {
        if (initialized && messages.length === 0) {
            addBotMessage(introMessage);
        }
    }, [initialized, messages.length]);

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'MekongBot', text }]);
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'You', text }]);
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        addUserMessage(message);
        setIsTyping(true);

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD2pKxRF5FS1oDLYtVWIG4qHQ1mTUXHDGA',
                {
                    contents: [{
                        parts: [{
                            text: `You are a helpful assistant specialized in the Mekong Delta region of Vietnam. 
                        Answer this question: ${message}. Keep your response concise and informative.`
                        }]
                    }],
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const fullText = response.data.candidates[0].content.parts[0].text;
            await typeWriterEffect(fullText, 10);
        } catch (error) {
            console.error('Error connecting to Gemini AI:', error);
            addBotMessage('Sorry, I had trouble processing your request. Please try again later.');
        } finally {
            setIsTyping(false);
            setMessage('');
        }
    };

    const typeWriterEffect = (text, delay = 30) => {
        return new Promise((resolve) => {
            let i = 0;
            const tempText = { sender: 'MekongBot', text: '' };

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
                    <ListItem key={index} alignItems="flex-start" sx={{
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
                                    MekongBot is typing...
                                </Typography>
                            </Box>
                        </Paper>
                    </ListItem>
                )}
            </List>
            <Box p={2} sx={{ borderTop: '1px solid #c8e6c9', bgcolor: 'white' }}>
                <Box display="flex" alignItems="center">
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Ask me anything about the Mekong Delta"
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
                        disabled={!message.trim()}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
};

export default ChatBotCom;