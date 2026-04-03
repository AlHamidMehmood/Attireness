import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductListing from "./components/ProductListing";
import ContactForm from "./components/ContactForm";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen">
          <Navbar />
          <CartDrawer />
          <main>
            <Hero />
            <ProductListing />
            <ContactForm />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
