import { useNavigate } from 'react-router-dom';

function Landing_page() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="judul">
                <h1>Selamat Datang di <span className="highlight">Apotek Nafindi</span></h1><br/>
                
                <p>Anda Butuh apa, kami siap membantu!</p>
                <button className="button" onClick={() => navigate('/Produk')}>Belanja Sekarang</button>
            </div>

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
        </div>
    );
}
export default Landing_page;