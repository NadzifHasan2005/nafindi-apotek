import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db.js';
import { upload } from './upload.js';

const app = express();
const JWT_SECRET = 'ganti_dengan_secret_key_yang_aman';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ===== Middleware cek token admin =====
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token tidak ada' });

    const token = authHeader.split(' ')[1];
    try {
        req.admin = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Token tidak valid' });
    }
    }

    // ===== Login Admin =====
    app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);

    if (rows.length === 0) return res.status(401).json({ message: 'Username tidak ditemukan' });

    const admin = rows[0];
    const cocok = await bcrypt.compare(password, admin.password);
    if (!cocok) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
    });

    // ===== Kategori =====
    app.get('/api/kategori-regulasi', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM kategori_regulasi');
    res.json(rows);
    });

    app.get('/api/kategori-kebutuhan', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM kategori_kebutuhan');
    res.json(rows);
    });

    // ===== Produk (publik) =====
    app.get('/api/produk', async (req, res) => {
    const { kategori_kebutuhan_id, kategori_regulasi_id } = req.query;
    let query = `SELECT p.*, kr.nama AS regulasi, kk.nama AS kebutuhan
                FROM produk p
                LEFT JOIN kategori_regulasi kr ON p.kategori_regulasi_id = kr.id
                LEFT JOIN kategori_kebutuhan kk ON p.kategori_kebutuhan_id = kk.id
                WHERE 1=1`;
    const params = [];
    if (kategori_kebutuhan_id) { query += ' AND p.kategori_kebutuhan_id = ?'; params.push(kategori_kebutuhan_id); }
    if (kategori_regulasi_id) { query += ' AND p.kategori_regulasi_id = ?'; params.push(kategori_regulasi_id); }
    const [rows] = await pool.query(query, params);
    res.json(rows);
    });

    // GET satu produk berdasarkan id (untuk halaman edit)
    app.get('/api/produk/:id', async (req, res) => {
    const [rows] = await pool.query(
        `SELECT p.*, kr.nama AS regulasi, kk.nama AS kebutuhan
        FROM produk p
        LEFT JOIN kategori_regulasi kr ON p.kategori_regulasi_id = kr.id
        LEFT JOIN kategori_kebutuhan kk ON p.kategori_kebutuhan_id = kk.id
        WHERE p.id = ?`,
        [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(rows[0]);
    });

    // ===== Produk (admin, wajib login) =====
    app.post('/api/admin/produk', verifyToken, upload.single('gambar'), async (req, res) => {
    const { nama, deskripsi, harga, stok, kategori_regulasi_id, kategori_kebutuhan_id, wajib_resep } = req.body;
    const gambar = req.file ? req.file.filename : null;
    const [result] = await pool.query(
        `INSERT INTO produk (nama, deskripsi, harga, stok, gambar, kategori_regulasi_id, kategori_kebutuhan_id, wajib_resep)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nama, deskripsi, harga, stok, gambar, kategori_regulasi_id, kategori_kebutuhan_id, wajib_resep === 'true']
    );
    res.json({ id: result.insertId });
    });

    app.put('/api/admin/produk/:id', verifyToken, async (req, res) => {
    const { nama, deskripsi, harga, stok, kategori_regulasi_id, kategori_kebutuhan_id, wajib_resep } = req.body;
    await pool.query(
        `UPDATE produk SET nama=?, deskripsi=?, harga=?, stok=?, kategori_regulasi_id=?, kategori_kebutuhan_id=?, wajib_resep=? WHERE id=?`,
        [nama, deskripsi, harga, stok, kategori_regulasi_id, kategori_kebutuhan_id, wajib_resep, req.params.id]
    );
    res.json({ success: true });
    });

    app.delete('/api/admin/produk/:id', verifyToken, async (req, res) => {
    await pool.query('DELETE FROM produk WHERE id = ?', [req.params.id]);
    res.json({ success: true });
    });

    // ===== Resep =====
    app.post('/api/resep', upload.single('file_resep'), async (req, res) => {
    const { produk_id, nama_pasien } = req.body;
    const [result] = await pool.query(
        'INSERT INTO resep (produk_id, nama_pasien, file_resep) VALUES (?, ?, ?)',
        [produk_id, nama_pasien, req.file.filename]
    );
    res.json({ id: result.insertId });
    });

    app.get('/api/admin/resep', verifyToken, async (req, res) => {
    const [rows] = await pool.query(`SELECT r.*, p.nama AS produk_nama FROM resep r
                                        JOIN produk p ON r.produk_id = p.id WHERE status='pending'`);
    res.json(rows);
    });

    app.put('/api/admin/resep/:id', verifyToken, async (req, res) => {
    const { status } = req.body;
    await pool.query('UPDATE resep SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
    });

    

app.listen(5000, () => console.log('Server jalan di http://localhost:5000'));