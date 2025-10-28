import React from 'react';
// ¡Asegúrate de que esta línea esté presente y correcta!
import { Routes, Route } from 'react-router-dom'; 

import './styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

import Home from './views/Home';
import Catalogo from './views/Catalogo'; 
import Nosotros from './views/Nosotros';
import Contacto from './views/Contacto';
import Login from './views/Login';
import Register from './views/Register';
import AdminDashboard from './views/AdminDashboard';
import AdminProducts from './views/AdminProducts';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  // ¡Aquí NO debe haber <BrowserRouter>!
  return (
    <> 
      <Navbar />
      <CartModal />
      <main>
        <Routes> {/* Verifica que Routes y Route estén bien importados */}
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/productos" element={<AdminProducts />} />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <h2>404 - Página No Encontrada</h2>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
