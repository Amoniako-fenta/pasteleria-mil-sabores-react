// ... (imports de React, BrowserRouter, etc.)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Register from './views/Register'; // <-- 1. Importa la nueva vista

// (Aquí importarás Login, Catalogo, etc.)

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} /> {/* <-- 2. Añade la ruta */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/catalogo" element={<Catalogo />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
