import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const kategoriUnggulan = [
    { nama: 'Obat Umum & P3K', icon: '🩹' },
    { nama: 'Ibu dan Anak', icon: '🍼' },
    { nama: 'Suplemen & Vitamin', icon: '💊' },
    { nama: 'Perawatan Pribadi', icon: '🧴' },
    { nama: 'Alat Kesehatan', icon: '🌡️' },
    { nama: 'Obat Penyakit Kronis', icon: '❤️' },
];

const testimoni = [
    { nama: 'Rina S.', isi: 'Pesan vitamin jam 9 malam, besok pagi udah sampai. Apotekernya juga ramah waktu saya tanya dosis.' },
    { nama: 'Agus P.', isi: 'Proses upload resep gampang dan cepat divalidasi. Nggak perlu antre di apotek fisik lagi.' },
    { nama: 'Dewi K.', isi: 'Lengkap banget kategorinya, dari obat anak sampai alat cek gula darah ada semua.' },
];

function Landing_page() {
    const navigate = useNavigate();
    const [produkTerlaris, setProdukTerlaris] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/produk')
            .then((res) => res.json())
            .then((data) => setProdukTerlaris(data.slice(0, 4)))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            {/* ===== Hero ===== */}
            <div className="judul">
                <h1>Selamat Datang di <span className="highlight">Apotek Nafindi</span></h1><br/>
                <p>Anda Butuh apa, kami siap membantu!</p>
                <button className="button" onClick={() => navigate('/Produk')}>Belanja Sekarang</button>
            </div>

            {/* ===== Langkah Belanja ===== */}
            <div className="langkah-belanja">
                <h2>Cara Belanja di Nafindi</h2>
                <p className="subjudul">Cukup 4 langkah, obat sampai di depan pintu</p>

                <div className="langkah-list">
                    <div className="langkah-card">
                        <div className="langkah-icon">🔍</div>
                        <div className="langkah-nomor">01</div>
                        <h3>Cari Produk</h3>
                        <p>Pilih obat atau kebutuhan kesehatan dari kategori Obat Umum, Vitamin, Ibu & Anak, hingga Alat Kesehatan.</p>
                    </div>

                    <div className="langkah-card">
                        <div className="langkah-icon">📋</div>
                        <div className="langkah-nomor">02</div>
                        <h3>Unggah Resep (Jika Perlu)</h3>
                        <p>Untuk obat keras bertanda <strong>K</strong> merah, unggah foto resep dokter agar divalidasi apoteker kami.</p>
                    </div>

                    <div className="langkah-card">
                        <div className="langkah-icon">🛒</div>
                        <div className="langkah-nomor">03</div>
                        <h3>Checkout & Bayar</h3>
                        <p>Masukkan ke keranjang, pilih metode pembayaran, dan selesaikan pesanan dengan aman.</p>
                    </div>

                    <div className="langkah-card">
                        <div className="langkah-icon">🚚</div>
                        <div className="langkah-nomor">04</div>
                        <h3>Obat Dikirim</h3>
                        <p>Apoteker kami memverifikasi dan mengemas pesanan, lalu dikirim langsung ke alamat Anda.</p>
                    </div>
                </div>
            </div>

            {/* ===== Kategori Unggulan ===== */}
            <div className="kategori-unggulan">
                <h2>Kategori Pilihan</h2>
                <p className="subjudul">Temukan kebutuhan kesehatan Anda lebih cepat</p>

                <div className="kategori-grid">
                    {kategoriUnggulan.map((k) => (
                        <div
                            className="kategori-item"
                            key={k.nama}
                            onClick={() => navigate('/Produk')}
                        >
                            <div className="kategori-item-icon">{k.icon}</div>
                            <p>{k.nama}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== Kenapa Pilih Kami ===== */}
            <div className="kenapa-kami">
                <h2>Kenapa Pilih Nafindi</h2>

                <div className="kenapa-list">
                    <div className="kenapa-item">
                        <div className="kenapa-icon">🎓</div>
                        <h3>Apoteker Bersertifikat</h3>
                        <p>Setiap pesanan diperiksa langsung oleh apoteker berpengalaman.</p>
                    </div>
                    <div className="kenapa-item">
                        <div className="kenapa-icon">✅</div>
                        <h3>Resep Tervalidasi</h3>
                        <p>Obat keras hanya diproses setelah resep dokter disetujui.</p>
                    </div>
                    <div className="kenapa-item">
                        <div className="kenapa-icon">🚀</div>
                        <h3>Pengiriman Cepat</h3>
                        <p>Pesanan diproses dan dikirim di hari yang sama.</p>
                    </div>
                    <div className="kenapa-item">
                        <div className="kenapa-icon">🛡️</div>
                        <h3>Produk Terdaftar BPOM</h3>
                        <p>Semua produk legal, asli, dan aman dikonsumsi.</p>
                    </div>
                </div>
            </div>

            {/* ===== Produk Terlaris ===== */}
            {produkTerlaris.length > 0 && (
                <div className="produk-terlaris">
                    <h2>Produk Terlaris</h2>
                    <p className="subjudul">Paling banyak dicari pelanggan kami</p>

                    <div className="produk-terlaris-list">
                        {produkTerlaris.map((p) => (
                            <div className="produk-terlaris-card" key={p.id}>
                                <h3>{p.nama}</h3>
                                <p className="harga">Rp {p.harga}</p>
                            </div>
                        ))}
                    </div>

                    <button className="button-outline" onClick={() => navigate('/Produk')}>
                        Lihat Semua Produk
                    </button>
                </div>
            )}

            {/* ===== Banner Konsultasi Apoteker ===== */}
            <div className="konsultasi-banner">
                <div>
                    <h2>Punya Pertanyaan Soal Obat?</h2>
                    <p>Chat langsung dengan apoteker kami, gratis dan tanpa antre.</p>
                </div>
                <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-whatsapp"
                >
                    💬 Chat Apoteker
                </a>
            </div>

            {/* ===== Testimoni ===== */}
            <div className="testimoni">
                <h2>Kata Pelanggan Kami</h2>

                <div className="testimoni-list">
                    {testimoni.map((t) => (
                        <div className="testimoni-card" key={t.nama}>
                            <p className="testimoni-isi">"{t.isi}"</p>
                            <p className="testimoni-nama">— {t.nama}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== Banner Legalitas ===== */}
            <div className="legalitas-banner">
                <p>🏥 Apotek Nafindi terdaftar resmi — Izin Apotek No. XXX/YYYY — Diawasi oleh Dinas Kesehatan</p>
            </div>
        </div>
    );
}
export default Landing_page;