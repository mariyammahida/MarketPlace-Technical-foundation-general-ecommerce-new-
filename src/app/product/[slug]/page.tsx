"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { groq } from "next-sanity";
import { product } from "../../../../types/product";

const getProduct = async (slug: string): Promise<product | null> => {
  try {
    const product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        name,
        price,
        description,
        image
      }`,
      { slug }
    );
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default function ProductPage() {
  const { slug } = useParams(); // ✅ Correct way to get slug
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    if (slug) {
      getProduct(slug as string).then((data) => setProduct(data));
    }
  }, [slug]);

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-11 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 items-center">
        {/* Image Section */}
        <div className="aspect-square bg-gray-50 flex justify-center items-center rounded-lg">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-lg shadow hover:bg-blue-600 focus:ring-2">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
