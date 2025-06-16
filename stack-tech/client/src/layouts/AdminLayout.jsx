// src/layouts/AdminLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';

const AdminLayout = () => {
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/orders', label: 'Orders' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded transition ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;