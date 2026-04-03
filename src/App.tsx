import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductListing from "./components/ProductListing";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <ProductListing />
        </main>
      </div>
    </WishlistProvider>
  );
}
