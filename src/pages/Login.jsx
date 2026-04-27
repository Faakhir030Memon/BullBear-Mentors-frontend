import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
        loadCaptchaEnginge(6);
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateCaptcha(captcha)) {
            setError('Invalid Captcha');
            return;
        }

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="login-page fade-in" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass" 
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '40px',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1E3A8A', fontSize: '2rem' }}>BBM Login</h2>
                
                {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 40px 12px 40px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <div 
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#9CA3AF' }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                    </div>

                    <div className="captcha-container" style={{ marginBottom: '20px' }}>
                        <div style={{ background: 'white', padding: '5px', borderRadius: '4px', marginBottom: '10px' }}>
                            <LoadCanvasTemplate />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Enter Captcha" 
                            required 
                            value={captcha}
                            onChange={(e) => setCaptcha(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '15px' }}>Login</button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                    <p style={{ color: '#9CA3AF' }}>Don't have an account? <Link to="/register" style={{ color: '#1E3A8A', textDecoration: 'none' }}>Register</Link></p>
                    <p style={{ marginTop: '10px' }}><Link to="/forgot-password" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Forgot Password?</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
