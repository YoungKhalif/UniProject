import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PreBuilt from './pages/PreBuilt';
import Configurator from './pages/Configurator';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-muted-light-grey">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pre-built" element={<PreBuilt />} />
          <Route path="/configurator" element={<Configurator />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;