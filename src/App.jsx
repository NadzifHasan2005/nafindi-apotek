import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import Home from './Landing_page.jsx';
import Produk from './Produk.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';

import AdminLayout from './admin/AdminLayout.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminProduk from './admin/produk/AdminProduk.jsx';
import AdminResep from './admin/AdminResep.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import AdminProdukNambah from './admin/produk/AdminProdukNambah.jsx';
import AdminProdukEdit from './admin/produk/AdminProdukEdit.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route publik pakai Navigation */}
        <Route path="/" element={<><Navigation /><Home /></>} />
        <Route path="/Produk" element={<><Navigation /><Produk /></>} />
        <Route path="/About" element={<><Navigation /><About /></>} />
        <Route path="/Contact" element={<><Navigation /><Contact /></>} />

        {/* Route admin, tanpa Navigation publik */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="produk" element={<AdminProduk />} />
          <Route path="produk/tambah" element={<AdminProdukNambah />} />
          <Route path="produk/edit/:id" element={<AdminProdukEdit />} />
          <Route path="resep" element={<AdminResep />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;