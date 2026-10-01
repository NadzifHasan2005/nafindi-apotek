import bcrypt from 'bcrypt';
import pool from './db.js';

const username = 'admin';
const password = 'admin123'; // ganti sesuai keinginan

const hash = await bcrypt.hash(password, 10);
await pool.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hash]);
console.log('Admin dibuat:', username, password);
process.exit();