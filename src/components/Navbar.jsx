import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="glass" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 5%',
            margin: '20px 5%',
            position: 'sticky',
            top: '20px',
            zIndex: 100
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
                BBM<span style={{ color: '#1E3A8A' }}>.</span>
            </Link>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>My Courses</Link>
                {user.role === 'admin' && (
                    <Link to="/admin" style={{ color: '#1E3A8A', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Shield size={18} /> Admin
                    </Link>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
                    <UserIcon size={18} />
                    <span>{user.name}</span>
                    <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
