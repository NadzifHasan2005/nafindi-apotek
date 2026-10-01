import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navigation">
        <div className="navigation-image">
            <NavLink to="/">Apotek Nafindi</NavLink>
        </div>
        <div className="navigation-list">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <b>Home</b>
            </NavLink>
            <NavLink to="/Produk" className={({ isActive }) => (isActive ? 'active' : '')}>
            <b>Produk</b>
            </NavLink>
            <NavLink to="/About" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
            </NavLink>
            <NavLink to="/Contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
            </NavLink>
        </div>
        </nav>
    );
}

export default Navigation;