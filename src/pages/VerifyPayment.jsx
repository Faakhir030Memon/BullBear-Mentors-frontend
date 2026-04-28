import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Verifying your payment...');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        // Safepay typically returns parameters like reference, tracker, sig, etc.
        // For our mockup, we just look for track and tracker.
        const orderId = queryParams.get('track') || queryParams.get('order_id');
        const tracker = queryParams.get('tracker') || queryParams.get('reference'); 

        if (orderId) {
            verifyWithBackend(orderId, tracker);
        } else {
            setStatus('Invalid payment response. Missing order tracking details.');
            setTimeout(() => navigate('/dashboard'), 3000);
        }
    }, [location]);

    const verifyWithBackend = async (orderId, tracker) => {
        try {
            const res = await axios.post('http://localhost:5000/api/orders/verify', {
                orderId: orderId,
                tracker: tracker || 'simulated_tracker'
            });

            if (res.data.message === 'Payment verified successfully') {
                setStatus('Payment successful! Enrolling you in the course...');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setStatus('Payment verification failed.');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setStatus('An error occurred during verification.');
        }
    };

    return (
        <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass" style={{ padding: '40px', maxWidth: '500px', width: '100%' }}>
                <h2 style={{ marginBottom: '20px', color: '#1E3A8A' }}>Payment Status</h2>
                <p style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>{status}</p>
                {status.includes('failed') || status.includes('error') ? (
                    <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/dashboard')}>
                        Go to Dashboard
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default VerifyPayment;
