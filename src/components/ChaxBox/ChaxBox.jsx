import { useState } from 'react';
import {
    Box,
    IconButton,
    Paper,
    Tabs,
    Tab,
    Button,
    Typography,
    Avatar
} from '@mui/material';
import {
    Chat as ChatIcon,
    Close as CloseIcon,
    TravelExplore as TravelExploreIcon,
    SmartToy as SmartToyIcon
} from '@mui/icons-material';
import TravelRecommendation from './TravelRecommendation';
import ChatBotCom from './ChatBotCom';
import logo from "../../assets/imgs/Logo.jpeg";

const ChatBox = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [initialized, setInitialized] = useState({
        travel: false,
        chat: false
    });

    const handleToggleChat = () => {
        const newState = !isChatOpen;
        setIsChatOpen(newState);

        if (newState) {
            setMessages([]);
            setInitialized({
                travel: false,
                chat: false
            });
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setMessages([]);
        setInitialized(prev => ({
            ...prev,
            [newValue === 0 ? 'travel' : 'chat']: false
        }));
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
                            <Avatar sx={{
                                bgcolor: '#81c784',
                                width: 36,
                                height: 36,
                                mr: 1,
                                fontWeight: 'bold'
                            }}>
                                {activeTab === 0 ? (
                                    <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
                                ) : (
                                    <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
                                )}
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {activeTab === 0 ? 'Cuu Long Vi Vu Assistant' : 'Cuu Long AI Chat'}
                            </Typography>
                        </Box>
                        <IconButton onClick={handleToggleChat} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            bgcolor: '#e8f5e9',
                            borderBottom: '1px solid #c8e6c9'
                        }}
                    >
                        <Tab
                            label="Travel Plan"
                            icon={<TravelExploreIcon />}
                            iconPosition="start"
                            sx={{
                                textTransform: 'none',
                                color: activeTab === 0 ? '#2e7d32' : '#81c784',
                                fontWeight: 'bold'
                            }}
                        />
                        <Tab
                            label="AI Chat"
                            icon={<SmartToyIcon />}
                            iconPosition="start"
                            sx={{
                                textTransform: 'none',
                                color: activeTab === 1 ? '#2e7d32' : '#81c784',
                                fontWeight: 'bold'
                            }}
                        />
                    </Tabs>

                    <Box flex={1} overflow="auto" p={2} sx={{ bgcolor: '#f1f8e9' }}>
                        {activeTab === 0 ? (
                            <TravelRecommendation
                                messages={messages}
                                setMessages={setMessages}
                                isTyping={isTyping}
                                setIsTyping={setIsTyping}
                                initialized={initialized.travel}
                                setInitialized={(value) => setInitialized(prev => ({ ...prev, travel: value }))}
                            />
                        ) : (
                            <ChatBotCom
                                messages={messages}
                                setMessages={setMessages}
                                isTyping={isTyping}
                                setIsTyping={setIsTyping}
                                initialized={initialized.chat}
                                setInitialized={(value) => setInitialized(prev => ({ ...prev, chat: value }))}
                            />
                        )}
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default ChatBox;