import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PaymentButton = ({ course }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Create order and get Safepay checkout URL
            const { data } = await axios.post('http://localhost:5000/api/orders/create', {
                amount: course.price,
                courseId: course._id,
                userId: user._id
            });

            if (data.checkoutUrl) {
                // Redirect to Safepay Checkout
                window.location.href = data.checkoutUrl;
            } else {
                alert('Could not initiate payment. Please try again.');
            }
        } catch (error) {
            console.error('Payment error', error);
            alert('Something went wrong with the payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            className="btn-primary" 
            onClick={handlePayment} 
            disabled={loading}
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
        >
            {loading ? 'Processing...' : `Buy Now for PKR ${course.price}`}
        </button>
    );
};

export default PaymentButton;
