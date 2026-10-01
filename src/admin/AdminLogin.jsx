import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.token) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
        } else {
        alert('Login gagal');
        }
    };

    return (
        <div className="admin-login-page">
            <form onSubmit={handleLogin} className="admin-login">
                <h2>Login Admin <span className="highlight">Apotek Nafindi</span></h2>
                <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;