import React, { useState, useEffect } from 'react';
import './ManageUser.css';
import Sidebar from './Sidebar1';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/login/getuser');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEdit = (user) => {
        console.log('Editing user:', user);
        setEditingUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
    };

    const handleDelete = async (userId) => {
        try {
            await fetch(`http://localhost:8080/login/${userId}`, {
                method: 'DELETE'
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSave = async () => {
        const user = { username, email, password };
        const url = editingUser ? `http://localhost:8080/login/${editingUser.id}` : 'http://localhost:8080/login';
        const method = editingUser ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error(`Error ${editingUser ? 'updating' : 'creating'} user:`, error);
        }

        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className='sideee'>
            <Sidebar />
        <div className="ma-container">
            <h1>Manage Users</h1>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSave}>
                    {editingUser ? 'Update User' : 'Create User'}
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ManageUser;
