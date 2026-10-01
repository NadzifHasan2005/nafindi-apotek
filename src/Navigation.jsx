import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navigation">
            <div className="navigation-image">
                <NavLink to="/" onClick={closeMenu}>Apotek Nafindi</NavLink>
            </div>

            {/* Tombol hamburger, hanya muncul di layar kecil (diatur via CSS) */}
            <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Buka menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`navigation-list ${menuOpen ? 'show' : ''}`}>
                <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                    <b>Home</b>
                </NavLink>
                <NavLink to="/Produk" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                    <b>Produk</b>
                </NavLink>
                <NavLink to="/About" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                    About
                </NavLink>
                <NavLink to="/Contact" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                    Contact
                </NavLink>
            </div>
        </nav>
    );
}

export default Navigation;