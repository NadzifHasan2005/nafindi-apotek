import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-col">
                    <h3>Apotek Nafindi</h3>
                    <p>Solusi kesehatan Anda, kapan saja, di mana saja.</p>
                </div>
                <div className="footer-col">
                    <h4>Alamat</h4>
                    <p>Jl. Contoh No. 123, Kota Anda</p>
                    <p>Buka setiap hari: 08.00 - 21.00</p>
                </div>
                <div className="footer-col">
                    <h4>Kontak</h4>
                    <p>📞 (021) 1234-5678</p>
                    <p>✉️ cs@nafindi.id</p>
                </div>
                <div className="footer-col">
                    <h4>Navigasi</h4>
                    <p onClick={() => navigate('/Produk')}>Produk</p>
                    <p onClick={() => navigate('/About')}>About</p>
                    <p onClick={() => navigate('/Contact')}>Contact</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Apotek Nafindi. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;