import { useEffect, useState } from 'react';

function AdminDashboard() {
    const [stats, setStats] = useState({ totalProduk: 0, totalResepPending: 0 });

    useEffect(() => {
        const fetchStats = async () => {
        const [produkRes, resepRes] = await Promise.all([
            fetch('http://localhost:5000/api/produk').then(r => r.json()),
            fetch('http://localhost:5000/api/admin/resep', {
            headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
            }).then(r => r.json()),
        ]);

        setStats({
            totalProduk: produkRes.length,
            totalResepPending: resepRes.length,
        });
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-page">
        <h1>Dashboard</h1>
        <div className="dashboard-cards">
            <div className="dashboard-card">
                <h2>{stats.totalProduk}</h2>
                <p>Total Produk</p>
            </div>
            <div className="dashboard-card">
                <h2>{stats.totalResepPending}</h2>
                <p>Resep Menunggu Validasi</p>
            </div>
        </div>
        </div>
    );
}

export default AdminDashboard;