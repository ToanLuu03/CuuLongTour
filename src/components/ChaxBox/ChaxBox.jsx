import { useState } from 'react';
import axios from 'axios';
import {
    Box,
    IconButton,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Paper,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const ChatBox = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleToggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: 'User', text: message };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setMessage('');
        setIsTyping(true);

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD2pKxRF5FS1oDLYtVWIG4qHQ1mTUXHDGA',
                {
                    contents: [
                        {
                            parts: [{ text: message }],
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const aiResponse = {
                sender: 'AI',
                text: response.data.candidates[0].content.parts[0].text,
            };
            setMessages((prevMessages) => [...prevMessages, aiResponse]);
        } catch (error) {
            console.error('Error connecting to Gemini AI:', error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <Box position="fixed" bottom={16} right={16} zIndex={1000}>
            {!isChatOpen ? (
                <Button onClick={handleToggleChat} color="primary" size="large">
                    <ChatIcon />
                </Button>
            ) : (
                <Paper elevation={6} sx={{ width: 400, height: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={1}
                        bgcolor="primary.main"
                        color="white"
                    >
                        <Typography variant="h6">AI Chat</Typography>
                        <IconButton onClick={handleToggleChat} color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box flex={1} overflow="auto" p={2}>
                        <List>
                            {messages.map((msg, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    <ListItemText
                                        primary={msg.sender}
                                        secondary={msg.text}
                                        sx={{
                                            textAlign: msg.sender === 'AI' ? 'left' : 'right',
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        {isTyping && (
                            <Typography variant="body2" color="textSecondary">
                                AI is typing...
                            </Typography>
                        )}
                    </Box>
                    <Box p={1} display="flex" alignItems="center" borderTop={1} borderColor="divider">
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Nhập tin nhắn..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <IconButton onClick={handleSendMessage} color="primary" sx={{ ml: 1 }}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default ChatBox;
