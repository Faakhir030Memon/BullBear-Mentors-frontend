import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, Play } from 'lucide-react';
import PaymentButton from '../components/PaymentButton';
import { useAuth } from '../context/AuthContext';

const CourseDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
    if (!course) return <div style={{ textAlign: 'center', padding: '100px' }}>Course not found</div>;

    const isEnrolled = user.enrolledCourses?.some(c => c._id === id || c === id);

    return (
        <div style={{ padding: '40px 5%', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{course.title}</h1>
                <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>{course.description}</p>
                
                <div className="glass" style={{ padding: '30px', marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '20px' }}>What you will learn</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {['PMX Fundamental Analysis', 'PSX Market Psychology', 'Risk Management', 'Live Trading Sessions'].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CheckCircle size={18} color="#059669" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <h3>Course Curriculum</h3>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[1, 2, 3, 4, 5].map((lesson) => (
                        <div key={lesson} className="glass" style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>{lesson}</div>
                                <span>Lesson {lesson}: Introduction to Market Structures</span>
                            </div>
                            <Play size={18} color={isEnrolled ? "#1E3A8A" : "#9CA3AF"} />
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="glass" style={{ padding: '30px', position: 'sticky', top: '120px' }}>
                    <img src={course.image || 'https://via.placeholder.com/300x200'} alt={course.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }} />
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>PKR {course.price}</div>
                    
                    {isEnrolled ? (
                        <button className="btn-secondary" style={{ width: '100%' }} disabled>Already Enrolled</button>
                    ) : (
                        <PaymentButton course={course} />
                    )}
                    
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9CA3AF', marginTop: '15px' }}>30-Day Money-Back Guarantee</p>
                </div>
            </motion.div>
        </div>
    );
};

export default CourseDetails;
