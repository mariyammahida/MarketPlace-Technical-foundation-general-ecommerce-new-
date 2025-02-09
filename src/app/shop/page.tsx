 "use client";

import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js optimized Image component
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { allproducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { product } from "../../../types/product";

const Shop = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: product[] = await client.fetch(allproducts);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Initially set filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // ✅ Search functionality without useCallback
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, 300);

    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchQuery, products]);

  const handleAddtoCart = (e: React.MouseEvent, product: product) => {
    e.preventDefault();
    Swal.fire({
      position: "top-right",
      title: `${product.name} added to cart`,
      text: "Added successfully!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading && <div>Loading products...</div>}

      {/* Displaying Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: product) => (
            <div key={product._id} className="border p-4 rounded-lg">
              <Link href={product.slug?.current ? `/product/${product.slug.current}` : "#"}>
                <div>
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()} // ✅ Optimized Image
                      alt={product.name}
                      width={300} // ✅ Required for Next.js optimization
                      height={300}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  )}
                  <h2 className="text-lg font-bold mt-2">{product.name}</h2>
                  <p>Price: ${product.price}</p>
                  <p>{product.description}</p>
                </div>
              </Link>

              <button
                className="mt-3 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                onClick={(e) => handleAddtoCart(e, product)}
              >
                Add To Cart
              </button>
            </div>
          ))
        ) : (
          !isLoading && <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
