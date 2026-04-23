import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <CartProvider>
      <Preloader />
      <CustomCursor />
      <BrowserRouter>
        <div className="app-container">
          <CartDrawer />
          <Header />
          <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AnimatedRoutes />
          </main>
          <Footer />
          
          <a href="https://wa.me/420737112733" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.13.56 4.208 1.621 6.03L.042 24l6.096-1.597c1.767 1.011 3.758 1.545 5.893 1.545 6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm0 21.947c-1.802 0-3.565-.483-5.112-1.4l-.367-.217-3.8.995 1.01-3.7-.238-.38c-1.004-1.602-1.533-3.456-1.533-5.362 0-5.556 4.524-10.082 10.082-10.082 5.56 0 10.084 4.526 10.084 10.082 0 5.556-4.524 10.082-10.082 10.082zm5.534-7.558c-.303-.153-1.796-.888-2.073-.99-.277-.103-.48-.153-.682.153-.203.303-.78 1.013-.956 1.218-.175.203-.353.228-.656.075-1.554-.78-2.585-1.428-3.585-2.613-.263-.312.264-.288.852-1.463.076-.153.038-.288-.038-.44-.075-.153-.682-1.642-.936-2.25-.248-.59-.496-.51-.682-.52-.175-.01-.378-.01-.58-.01-.202 0-.53.075-.808.38-.278.303-1.06 1.037-1.06 2.528 0 1.49 1.086 2.932 1.238 3.136.152.203 2.14 3.268 5.184 4.582.724.314 1.288.5 1.73.642.728.23 1.39.197 1.91.12.58-.086 1.797-.734 2.05-1.444.252-.71.252-1.318.176-1.444-.076-.128-.278-.204-.58-.356z"/>
            </svg>
          </a>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
