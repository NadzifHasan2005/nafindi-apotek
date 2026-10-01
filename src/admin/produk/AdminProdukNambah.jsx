import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminProdukNambah() {
    const navigate = useNavigate();
    const [kategoriRegulasi, setKategoriRegulasi] = useState([]);
    const [kategoriKebutuhan, setKategoriKebutuhan] = useState([]);
    const [form, setForm] = useState({
        nama: '', deskripsi: '', harga: '', stok: '',
        kategori_regulasi_id: '', kategori_kebutuhan_id: '', wajib_resep: false, gambar: null,
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/kategori-regulasi').then(r => r.json()).then(setKategoriRegulasi);
        fetch('http://localhost:5000/api/kategori-kebutuhan').then(r => r.json()).then(setKategoriKebutuhan);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('admin_token');
        const data = new FormData();
        Object.entries(form).forEach(([key, val]) => data.append(key, val));

        await fetch('http://localhost:5000/api/admin/produk', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
        });

        navigate('/admin/produk'); // balik ke daftar produk setelah simpan
    };

    return (
        <div className="admin-page">
        <h1>Tambah Produk Baru</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
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

            <input type="file" onChange={(e) => setForm({ ...form, gambar: e.target.files[0] })} />

            <button type="submit">Simpan</button>
            <button type="button" onClick={() => navigate('/admin/produk')}>Batal</button>
        </form>
        </div>
    );
}

export default AdminProdukNambah;