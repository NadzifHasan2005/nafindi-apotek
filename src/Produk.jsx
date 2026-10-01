import { useEffect, useState } from 'react';

function Produk() {
    const [produk, setProduk] = useState([]);
    const [kategoriRegulasi, setKategoriRegulasi] = useState([]);
    const [kategoriKebutuhan, setKategoriKebutuhan] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [filterKebutuhan, setFilterKebutuhan] = useState('');
    const [filterRegulasi, setFilterRegulasi] = useState('');
    const [sortHarga, setSortHarga] = useState('');

    // Ambil daftar kategori sekali saja
    useEffect(() => {
        fetch('http://localhost:5000/api/kategori-regulasi').then(r => r.json()).then(setKategoriRegulasi);
        fetch('http://localhost:5000/api/kategori-kebutuhan').then(r => r.json()).then(setKategoriKebutuhan);
    }, []);

    // Ambil produk setiap kali filter/pencarian berubah
    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (filterKebutuhan) params.append('kategori_kebutuhan_id', filterKebutuhan);
        if (filterRegulasi) params.append('kategori_regulasi_id', filterRegulasi);

        const timeout = setTimeout(() => {
            fetch(`http://localhost:5000/api/produk?${params.toString()}`)
                .then((res) => res.json())
                .then((data) => {
                    let hasil = data;
                    if (sortHarga === 'asc') hasil = [...data].sort((a, b) => a.harga - b.harga);
                    if (sortHarga === 'desc') hasil = [...data].sort((a, b) => b.harga - a.harga);
                    setProduk(hasil);
                    setLoading(false);
                })
                .catch((err) => { console.error(err); setLoading(false); });
        }, 400); // debounce biar tidak fetch tiap ketikan huruf

        return () => clearTimeout(timeout);
    }, [search, filterKebutuhan, filterRegulasi, sortHarga]);

    const resetFilter = () => {
        setSearch('');
        setFilterKebutuhan('');
        setFilterRegulasi('');
        setSortHarga('');
    };

    const labelLogo = (logo) => {
        if (logo === 'hijau') return { teks: 'Obat Bebas', kelas: 'badge-hijau' };
        if (logo === 'biru') return { teks: 'Bebas Terbatas', kelas: 'badge-biru' };
        if (logo === 'k_merah') return { teks: 'Obat Keras (K)', kelas: 'badge-merah' };
        return null;
    };

    return (
        <div className="produk-landing">
            <div className="produk-header">
                <h1>Produk Kami</h1>
                <p className="subjudul">Temukan obat dan kebutuhan kesehatan Anda</p>
            </div>

            {/* ===== Toolbar: pencarian & filter ===== */}
            <div className="produk-toolbar">
                <div className="produk-search">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Cari nama produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select value={filterKebutuhan} onChange={(e) => setFilterKebutuhan(e.target.value)}>
                    <option value="">Semua Kategori</option>
                    {kategoriKebutuhan.map((k) => (
                        <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                </select>

                <select value={filterRegulasi} onChange={(e) => setFilterRegulasi(e.target.value)}>
                    <option value="">Semua Golongan Obat</option>
                    {kategoriRegulasi.map((k) => (
                        <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                </select>

                <select value={sortHarga} onChange={(e) => setSortHarga(e.target.value)}>
                    <option value="">Urutkan Harga</option>
                    <option value="asc">Termurah</option>
                    <option value="desc">Termahal</option>
                </select>

                {(search || filterKebutuhan || filterRegulasi || sortHarga) && (
                    <button className="produk-reset" onClick={resetFilter}>Reset Filter</button>
                )}
            </div>

            {/* ===== Chip kategori cepat ===== */}
            <div className="produk-chip-list">
                {kategoriKebutuhan.map((k) => (
                    <button
                        key={k.id}
                        className={`produk-chip ${filterKebutuhan === String(k.id) ? 'active' : ''}`}
                        onClick={() => setFilterKebutuhan(filterKebutuhan === String(k.id) ? '' : String(k.id))}
                    >
                        {k.nama}
                    </button>
                ))}
            </div>

            {/* ===== Hasil produk ===== */}
            {loading ? (
                <p className="produk-status">Memuat produk...</p>
            ) : produk.length === 0 ? (
                <div className="produk-kosong">
                    <p>😕 Produk tidak ditemukan</p>
                    <button className="button-outline" onClick={resetFilter}>Reset Pencarian</button>
                </div>
            ) : (
                <div className="produk-kategori">
                    {produk.map((item) => {
                        const badge = labelLogo(item.regulasi_logo);
                        return (
                            <div className={`kategori-card ${item.stok === 0 ? 'stok-habis' : ''}`} key={item.id}>
                                {badge && <span className={`produk-badge ${badge.kelas}`}>{badge.teks}</span>}

                                <div className="produk-gambar-wrapper">
                                    {item.gambar ? (
                                        <img
                                            src={`http://localhost:5000/uploads/${item.gambar}`}
                                            alt={item.nama}
                                            className="produk-gambar"
                                        />
                                    ) : (
                                        <div className="produk-gambar-kosong">💊</div>
                                    )}
                                </div>

                                <h2>{item.nama}</h2>
                                {item.deskripsi && <p className="produk-deskripsi">{item.deskripsi}</p>}
                                <p className="produk-harga">Rp {Number(item.harga).toLocaleString('id-ID')}</p>
                                <p className="produk-stok">
                                    {item.stok > 0 ? `Stok: ${item.stok}` : 'Stok habis'}
                                </p>
                                {item.wajib_resep ? (
                                    <button className="button-outline" disabled={item.stok === 0}>
                                        Butuh Resep — Unggah
                                    </button>
                                ) : (
                                    <button className="button" disabled={item.stok === 0}>
                                        {item.stok === 0 ? 'Stok Habis' : 'Beli'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Produk;