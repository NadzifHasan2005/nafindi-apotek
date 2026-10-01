import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
        <aside className="admin-sidebar">
            <h2>Admin Panel</h2>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
            <NavLink to="/admin/produk">Kelola Produk</NavLink>
            <NavLink to="/admin/resep">Validasi Resep</NavLink>

            <button className="logout-button" onClick={handleLogout}>
            Logout
            </button>
        </aside>
        <main className="admin-content">
            <Outlet />
        </main>
        </div>
    );
}

export default AdminLayout;