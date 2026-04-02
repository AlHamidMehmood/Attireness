import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductListing from "./components/ProductListing";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProductListing />
      </main>
    </div>
  );
}
