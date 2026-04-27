import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, PlayCircle, Star, Users } from 'lucide-react';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/courses');
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="home-page" style={{ padding: '40px 5%' }}>
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '80px' }}
            >
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', background: 'linear-gradient(45deg, #1E3A8A, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Master PMX & PSX Strategies
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#9CA3AF', maxWidth: '800px', margin: '0 auto 40px' }}>
                    Join the elite community of BullBear Mentors. Learn professional trading and investment strategies from industry experts.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button className="btn-primary">Get Started</button>
                    <button className="btn-secondary">Watch Demo</button>
                </div>
            </motion.section>

            {/* Courses Section */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2rem' }}>Featured Courses</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: '#1E3A8A' }}>PMX</span>
                        <span style={{ color: '#9CA3AF' }}>|</span>
                        <span style={{ color: '#1E3A8A' }}>PSX</span>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px' }}>Loading Courses...</div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                        gap: '30px' 
                    }}>
                        {courses.map((course) => (
                            <motion.div 
                                key={course._id}
                                whileHover={{ scale: 1.03 }}
                                className="glass"
                                style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}
                            >
                                <div style={{ 
                                    height: '200px', 
                                    background: `url(${course.image || 'https://via.placeholder.com/300x200'}) center/cover`,
                                    borderRadius: '8px',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{ 
                                        padding: '5px 10px', 
                                        background: course.status === 'available' ? '#059669' : '#d97706',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        width: 'fit-content',
                                        margin: '10px'
                                    }}>
                                        {course.status.toUpperCase()}
                                    </div>
                                </div>
                                <h3 style={{ marginBottom: '10px' }}>{course.title}</h3>
                                <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '20px', height: '40px', overflow: 'hidden' }}>
                                    {course.description}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1E3A8A' }}>PKR {course.price}</span>
                                    <button 
                                        onClick={() => navigate(`/course/${course._id}`)}
                                        className="btn-primary" 
                                        style={{ padding: '8px 16px' }}
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Stats Section */}
            <section style={{ marginTop: '100px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' }}>
                <div className="glass" style={{ padding: '30px' }}>
                    <Users size={40} color="#1E3A8A" style={{ marginBottom: '15px' }} />
                    <h3>5,000+</h3>
                    <p style={{ color: '#9CA3AF' }}>Active Students</p>
                </div>
                <div className="glass" style={{ padding: '30px' }}>
                    <PlayCircle size={40} color="#1E3A8A" style={{ marginBottom: '15px' }} />
                    <h3>150+</h3>
                    <p style={{ color: '#9CA3AF' }}>HD Video Lessons</p>
                </div>
                <div className="glass" style={{ padding: '30px' }}>
                    <Star size={40} color="#1E3A8A" style={{ marginBottom: '15px' }} />
                    <h3>4.9/5</h3>
                    <p style={{ color: '#9CA3AF' }}>Student Rating</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
