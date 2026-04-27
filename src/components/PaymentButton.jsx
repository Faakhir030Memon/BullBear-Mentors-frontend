import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PaymentButton = ({ course }) => {
    const { user } = useAuth();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            // Create order on backend
            const { data: order } = await axios.post('http://localhost:5000/api/orders/create', {
                amount: course.price,
                courseId: course._id,
                userId: user._id
            });

            const options = {
                key: 'YOUR_RAZORPAY_KEY_ID', // Enter your Key ID here
                amount: order.amount,
                currency: "INR",
                name: "BullBear Mentors",
                description: `Purchase ${course.title}`,
                image: "https://example.com/logo.png",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', response);
                        if (verifyRes.data.message === 'Payment verified successfully') {
                            alert('Enrolled successfully!');
                            window.location.href = '/dashboard';
                        }
                    } catch (error) {
                        alert('Verification failed');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#1E3A8A",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment error', error);
            alert('Something went wrong with the payment');
        }
    };

    return (
        <button className="btn-primary" onClick={handlePayment} style={{ width: '100%' }}>
            Buy Now for PKR {course.price}
        </button>
    );
};

export default PaymentButton;
