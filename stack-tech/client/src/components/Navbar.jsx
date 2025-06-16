import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pre-Built PCs', path: '/pre-built' },
    { name: 'Custom Builder', path: '/configurator' },
    { name: 'Accessories', path: '/accessories' },
  ];

  return (
    <header className="bg-dark-charcoal text-muted-light-grey shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-violet-accent">
          Stack Technologies
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `hover:text-violet-accent transition-colors ${
                  isActive ? 'text-violet-accent font-semibold' : ''
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/account" className="hover:text-violet-accent transition-colors">
                My Account
              </Link>
              <button 
                onClick={logout}
                className="hover:text-violet-accent transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="hover:text-violet-accent transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:text-violet-accent transition-colors">
                Register
              </Link>
            </div>
          )}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-muted-light-grey hover:text-violet-accent" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-violet-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;