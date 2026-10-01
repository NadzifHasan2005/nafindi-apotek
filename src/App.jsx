import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
import Home from './Landing_page.jsx';
import Produk from './Produk.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';

import AdminLayout from './admin/AdminLayout.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminProduk from './admin/produk/AdminProduk.jsx';
import AdminProdukNambah from './admin/produk/AdminProdukNambah.jsx';
import AdminProdukEdit from './admin/produk/AdminProdukEdit.jsx';
import AdminResep from './admin/AdminResep.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';

// Layout untuk halaman publik: Navigation di atas, Footer di bawah
function PublicLayout({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Route publik — pakai Navigation + Footer */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/Produk" element={<PublicLayout><Produk /></PublicLayout>} />
        <Route path="/About" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/Contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Route admin — tanpa Navigation/Footer publik */}
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