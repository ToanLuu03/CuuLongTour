import { useState } from 'react';
import { Button, TextField, Typography, Box, Link } from '@mui/material';
import { login, dnt_Have_Acc, forgot_pass, signup } from './text.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                setError('');
                // Chuyển hướng đến trang tương ứng sau khi đăng nhập
                navigate('/');
            } else {
                setError('Please enter both email and password.');
            }
        }
        catch (error) {
            setError(error.message);
        }

    };

    return (
        <Box sx={{ width: '300px', margin: 'auto', padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>{login}</Typography>

            <form onSubmit={handleLogin}>
                {/* Email Input */}
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />

                {/* Password Input */}
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                {/* Login Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '1rem' }}>
                    Login
                </Button>

                {/* Error Message */}
                {error && <Typography color="error" sx={{ marginTop: '1rem' }}>{error}</Typography>}
            </form>

            {/* Đăng ký tài khoản */}
            <Typography variant="body2" sx={{ marginTop: '1rem' }}>
                {dnt_Have_Acc} <Link href="/register">{signup}</Link>
            </Typography>

            {/* Quên mật khẩu */}
            <Typography variant="body2" sx={{ marginTop: '1rem' }}>
                <Link href="/forgot-password">{forgot_pass}</Link>
            </Typography>
        </Box>
    );
};

export default Login;
