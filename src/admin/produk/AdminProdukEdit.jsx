import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AdminProdukEdit() {
    const navigate = useNavigate();
    const { id } = useParams(); // ambil id dari URL /admin/produk/edit/:id

    const [kategoriRegulasi, setKategoriRegulasi] = useState([]);
    const [kategoriKebutuhan, setKategoriKebutuhan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        nama: '', deskripsi: '', harga: '', stok: '',
        kategori_regulasi_id: '', kategori_kebutuhan_id: '', wajib_resep: false,
    });

    // Ambil data kategori + data produk yang mau diedit
    useEffect(() => {
        fetch('http://localhost:5000/api/kategori-regulasi').then(r => r.json()).then(setKategoriRegulasi);
        fetch('http://localhost:5000/api/kategori-kebutuhan').then(r => r.json()).then(setKategoriKebutuhan);

        fetch(`http://localhost:5000/api/produk/${id}`)
        .then(r => r.json())
        .then((data) => {
            setForm({
            nama: data.nama,
            deskripsi: data.deskripsi || '',
            harga: data.harga,
            stok: data.stok,
            kategori_regulasi_id: data.kategori_regulasi_id || '',
            kategori_kebutuhan_id: data.kategori_kebutuhan_id || '',
            wajib_resep: !!data.wajib_resep,
            });
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('admin_token');

        await fetch(`http://localhost:5000/api/admin/produk/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
        });

        navigate('/admin/produk');
    };

    if (loading) return <p>Memuat data produk...</p>;

    return (
        <div className="admin-page">
        <h1>Edit Produk</h1>

        <form onSubmit={handleSubmit}>
            <input placeholder="Nama produk" value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })} required />

            <textarea placeholder="Deskripsi" value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />

            <input type="number" placeholder="Harga" value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })} required />

            <input type="number" placeholder="Stok" value={form.stok}
            onChange={(e) => setForm({ ...form, stok: e.target.value })} required />

            <select value={form.kategori_regulasi_id}
            onChange={(e) => setForm({ ...form, kategori_regulasi_id: e.target.value })} required>
            <option value="">-- Kategori Regulasi --</option>
            {kategoriRegulasi.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
            </select>

            <select value={form.kategori_kebutuhan_id}
            onChange={(e) => setForm({ ...form, kategori_kebutuhan_id: e.target.value })} required>
            <option value="">-- Kategori Kebutuhan --</option>
            {kategoriKebutuhan.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
            </select>

            <label>
            <input type="checkbox" checked={form.wajib_resep}
                onChange={(e) => setForm({ ...form, wajib_resep: e.target.checked })} />
            Wajib upload resep dokter
            </label>

            <button type="submit">Update</button>
            <button type="button" onClick={() => navigate('/admin/produk')}>Batal</button>
        </form>
        </div>
    );
}

export default AdminProdukEdit;