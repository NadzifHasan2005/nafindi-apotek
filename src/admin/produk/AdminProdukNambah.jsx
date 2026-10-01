import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminProdukNambah() {
    const navigate = useNavigate();
    const [kategoriRegulasi, setKategoriRegulasi] = useState([]);
    const [kategoriKebutuhan, setKategoriKebutuhan] = useState([]);
    const [preview, setPreview] = useState(null);
    const [errorGambar, setErrorGambar] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        nama: '', deskripsi: '', harga: '', stok: '',
        kategori_regulasi_id: '', kategori_kebutuhan_id: '', wajib_resep: false, gambar: null,
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/kategori-regulasi').then(r => r.json()).then(setKategoriRegulasi);
        fetch('http://localhost:5000/api/kategori-kebutuhan').then(r => r.json()).then(setKategoriKebutuhan);
    }, []);

    const handleGambarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validasi tipe file
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setErrorGambar('Hanya file JPG, PNG, atau WEBP yang diperbolehkan');
            e.target.value = '';
            return;
        }

        // Validasi ukuran maks 2MB
        if (file.size > 2 * 1024 * 1024) {
            setErrorGambar('Ukuran gambar maksimal 2MB');
            e.target.value = '';
            return;
        }

        setErrorGambar('');
        setForm({ ...form, gambar: file });
        setPreview(URL.createObjectURL(file));
    };

    const hapusGambar = () => {
        setForm({ ...form, gambar: null });
        setPreview(null);
        setErrorGambar('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const token = localStorage.getItem('admin_token');
        const data = new FormData();
        Object.entries(form).forEach(([key, val]) => data.append(key, val));

        try {
            const res = await fetch('http://localhost:5000/api/admin/produk', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: data,
            });

            const result = await res.json();

            if (!res.ok) {
                // Server membalas error (401, 500, dll) — jangan navigate, tampilkan pesannya
                alert(`Gagal menyimpan produk: ${result.message || 'Terjadi kesalahan'}`);
                setSubmitting(false);
                return;
            }

            navigate('/admin/produk');
        } catch (err) {
            console.error(err);
            alert('Gagal menyimpan produk, periksa koneksi ke server.');
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-page">
            <h1>Tambah Produk Baru</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Nama Produk</label>
                    <input placeholder="Contoh: Paracetamol 500mg" value={form.nama}
                        onChange={(e) => setForm({ ...form, nama: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea placeholder="Jelaskan kegunaan, dosis, atau catatan produk" value={form.deskripsi}
                        onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Harga (Rp)</label>
                        <input type="number" placeholder="0" value={form.harga}
                            onChange={(e) => setForm({ ...form, harga: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Stok</label>
                        <input type="number" placeholder="0" value={form.stok}
                            onChange={(e) => setForm({ ...form, stok: e.target.value })} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Golongan Obat</label>
                        <select value={form.kategori_regulasi_id}
                            onChange={(e) => setForm({ ...form, kategori_regulasi_id: e.target.value })} required>
                            <option value="">-- Pilih Golongan --</option>
                            {kategoriRegulasi.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Kategori Kebutuhan</label>
                        <select value={form.kategori_kebutuhan_id}
                            onChange={(e) => setForm({ ...form, kategori_kebutuhan_id: e.target.value })} required>
                            <option value="">-- Pilih Kategori --</option>
                            {kategoriKebutuhan.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                        </select>
                    </div>
                </div>

                <label className="form-checkbox">
                    <input type="checkbox" checked={form.wajib_resep}
                        onChange={(e) => setForm({ ...form, wajib_resep: e.target.checked })} />
                    <span>Wajib upload resep dokter (untuk Obat Keras)</span>
                </label>

                {/* ===== Upload Gambar ===== */}
                <div className="upload-gambar-area">
                    <label className="upload-label">Gambar Produk</label>

                    {preview ? (
                        <div className="preview-wrapper">
                            <img src={preview} alt="Preview produk" className="preview-gambar" />
                            <button type="button" className="hapus-preview" onClick={hapusGambar}>✕</button>
                        </div>
                    ) : (
                        <label className="upload-dropzone">
                            <span>📷 Klik untuk pilih gambar</span>
                            <small>JPG, PNG, atau WEBP — maks 2MB</small>
                            <input type="file" accept="image/jpeg,image/png,image/webp"
                                onChange={handleGambarChange} hidden />
                        </label>
                    )}

                    {errorGambar && <p className="upload-error">{errorGambar}</p>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-simpan" disabled={submitting}>
                        {submitting ? 'Menyimpan...' : '✓ Simpan Produk'}
                    </button>
                    <button type="button" className="btn-batal" onClick={() => navigate('/admin/produk')}>
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminProdukNambah;