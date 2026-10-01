import { useEffect, useState } from 'react';

function AdminResep() {
    const [resep, setResep] = useState([]);

    const fetchResep = () => {
        fetch('http://localhost:5000/api/admin/resep').then(r => r.json()).then(setResep);
    };

    useEffect(() => { fetchResep(); }, []);

    const handleValidasi = async (id, status) => {
        await fetch(`http://localhost:5000/api/admin/resep/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        });
        fetchResep();
    };

  return (
        <div>
        <h1>Validasi Resep</h1>
        <table>
            <thead><tr><th>Pasien</th><th>Produk</th><th>File</th><th>Aksi</th></tr></thead>
            <tbody>
            {resep.map(r => (
                <tr key={r.id}>
                <td>{r.nama_pasien}</td>
                <td>{r.produk_nama}</td>
                <td><a href={`http://localhost:5000/uploads/${r.file_resep}`} target="_blank">Lihat</a></td>
                <td>
                    <button onClick={() => handleValidasi(r.id, 'disetujui')}>Setujui</button>
                    <button onClick={() => handleValidasi(r.id, 'ditolak')}>Tolak</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default AdminResep;