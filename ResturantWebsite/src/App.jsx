import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ScrollTrigger } from './animations/gsapConfig';

import LoadingScreen from './components/common/LoadingScreen';
import ScrollProgress from './components/common/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import CartToast from './components/cart/CartToast';

import Home from './pages/Home';

import Checkout from './pages/Checkout';
import Menu from './pages/Menu';


// Handles route changes + in-page hash links like "/#burgers".
function ScrollManager() {
  const { pathname,hash } = useLocation();

  useEffect(() => {
    let timer;
    let tries = 0;

    if (!hash || hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries++ < 25) {
        timer = setTimeout(tryScroll, 60); // wait for the page to mount
      }
    };
    timer = setTimeout(tryScroll, 80);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();

  // Recalculate pin positions after a route's content has settled.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress/>
      <Navbar />
      <ScrollManager />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu/>} />
          {/* <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/locations" element={<Location />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <CartToast />
    </>
  );
}