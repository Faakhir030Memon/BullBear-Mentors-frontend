import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, Users, CreditCard, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('courses');
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', image: '', status: 'available' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cRes, uRes, oRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/courses'),
                    axios.get('http://localhost:5000/api/admin/users'),
                    axios.get('http://localhost:5000/api/admin/orders')
                ]);
                setCourses(cRes.data);
                setUsers(uRes.data);
                setOrders(oRes.data);
            } catch (error) {
                console.error('Error fetching admin data', error);
            }
        };
        fetchData();
    }, []);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/courses', newCourse);
            setCourses([...courses, data]);
            setShowModal(false);
            setNewCourse({ title: '', description: '', price: '', image: '', status: 'available' });
        } catch (error) {
            alert('Error adding course');
        }
    };

    return (
        <div className="admin-dashboard" style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '250px', padding: '30px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ color: '#1E3A8A', marginBottom: '40px' }}>BBM Admin</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <button onClick={() => setActiveTab('courses')} style={{ background: 'transparent', border: 'none', color: activeTab === 'courses' ? '#1E3A8A' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <LayoutDashboard size={20} /> Courses
                    </button>
                    <button onClick={() => setActiveTab('users')} style={{ background: 'transparent', border: 'none', color: activeTab === 'users' ? '#1E3A8A' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Users size={20} /> Users
                    </button>
                    <button onClick={() => setActiveTab('orders')} style={{ background: 'transparent', border: 'none', color: activeTab === 'orders' ? '#1E3A8A' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CreditCard size={20} /> Transactions
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: '40px' }}>
                {activeTab === 'courses' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                            <h2>Manage Courses</h2>
                            <button className="btn-primary" onClick={() => setShowModal(true)}>
                                <Plus size={20} /> Add Course
                            </button>
                        </div>
                        <div className="glass" style={{ padding: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '15px' }}>Title</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px' }}>{course.title}</td>
                                            <td>PKR {course.price}</td>
                                            <td><span style={{ color: course.status === 'available' ? '#059669' : '#d97706' }}>{course.status}</span></td>
                                            <td>
                                                <button style={{ background: 'transparent', border: 'none', color: '#1E3A8A', marginRight: '10px' }}><Edit size={18}/></button>
                                                <button style={{ background: 'transparent', border: 'none', color: '#ef4444' }}><Trash size={18}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        <h2>Enrolled Users</h2>
                        <div className="glass" style={{ padding: '20px', marginTop: '30px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '15px' }}>Name</th>
                                        <th>Email</th>
                                        <th>Enrolled Courses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px' }}>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.enrolledCourses?.map(c => c.title).join(', ') || 'None'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <h2>Transactions</h2>
                        <div className="glass" style={{ padding: '20px', marginTop: '30px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '15px' }}>Order ID</th>
                                        <th>User</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px' }}>{order.orderId}</td>
                                            <td>{order.user?.name}</td>
                                            <td>PKR {order.amount}</td>
                                            <td><span style={{ color: order.status === 'completed' ? '#059669' : '#ef4444' }}>{order.status}</span></td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Course Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="glass" style={{ padding: '40px', width: '400px' }}>
                        <h3>Add New Course</h3>
                        <form onSubmit={handleAddCourse} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input type="text" placeholder="Title" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: 'white' }} 
                                value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} />
                            <textarea placeholder="Description" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: 'white', height: '100px' }}
                                value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} />
                            <input type="number" placeholder="Price" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: 'white' }}
                                value={newCourse.price} onChange={(e) => setNewCourse({...newCourse, price: e.target.value})} />
                            <input type="text" placeholder="Image URL" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: 'white' }}
                                value={newCourse.image} onChange={(e) => setNewCourse({...newCourse, image: e.target.value})} />
                            <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: 'white' }}
                                value={newCourse.status} onChange={(e) => setNewCourse({...newCourse, status: e.target.value})}>
                                <option value="available">Available</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="pending">Pending</option>
                            </select>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save</button>
                                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
