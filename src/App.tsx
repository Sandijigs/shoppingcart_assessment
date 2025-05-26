import "./App.css";
import { products } from "./data/products";
import { ProductCard } from "./components/ProductCard";
import type { Product } from "./types";

function App() {
  const handleAddToCart = (product: Product) => {
    // We'll implement this in the next feature
    console.log("Adding to cart:", product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
