import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import AttirenessBunyad from "./pages/AttirenessBunyad";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import Footer from "./components/Footer";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CategoryProvider } from "./context/CategoryContext";

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <CategoryProvider>
            <Router>
            <div className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-black selection:text-brand-white">
              <Navbar />
              <CartDrawer />
              <WishlistDrawer />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/attireness-bunyad" element={<AttirenessBunyad />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CategoryProvider>
      </WishlistProvider>
    </CartProvider>
  </CurrencyProvider>
);
}
