import { useEffect, useState } from 'react';

function Produk() {
    const [produk, setProduk] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/produk')
        .then((res) => res.json())
        .then((data) => setProduk(data))
        .catch((err) => console.error(err));
    }, []);

    return (
        <div className="produk-landing">
        <h1>Produk Kami</h1>
        <div className="produk-kategori">
            {produk.map((item) => (
            <div className="kategori-card" key={item.id}>
                <h2>{item.nama}</h2>
                <p>Rp {item.harga}</p>
            </div>
            ))}
        </div>
        </div>
    );
}

export default Produk;