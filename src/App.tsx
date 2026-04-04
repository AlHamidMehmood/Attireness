import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <CartDrawer />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
