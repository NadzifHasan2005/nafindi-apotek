import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AdminProduk() {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:5000/api/produk').then(r => r.json()).then(setProduk);
  };

  useEffect(() => { fetchData(); }, []);

  const handleNambah = () => {
    navigate('/admin/produk/tambah');
  };
  const handleEdit = () => {
    navigate('/admin/produk/edit')
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus produk ini?')) return;
    const token = localStorage.getItem('admin_token');
    await fetch(`http://localhost:5000/api/admin/produk/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  return (
    <div className="admin-page">
      <h1>Kelola Produk</h1>
      <button className="admin-page-button-add" onClick={handleNambah}>Tambah Produk Baru</button>

      <table>
        <thead>
          <tr><th>Nama</th><th>Regulasi</th><th>Kebutuhan</th><th>Harga</th><th>Stok</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {produk.map((p) => (
            <tr key={p.id}>
              <td>{p.nama}</td>
              <td>{p.regulasi}</td>
              <td>{p.kebutuhan}</td>
              <td>Rp {p.harga}</td>
              <td>{p.stok}</td>
              <td><button  className="admin-page-button-edit"  onClick={() => navigate(`/admin/produk/edit/${p.id}`)}>Edit</button>
                  <button className="admin-page-button-delete" onClick={() => handleDelete(p.id)}>Hapus</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProduk;