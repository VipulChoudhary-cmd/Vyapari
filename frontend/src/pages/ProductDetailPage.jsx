import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Loader, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20">
        <Loader className="animate-spin text-emerald-400" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Link to="/" className="text-emerald-400 hover:text-emerald-300">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Product Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              {product.isFeatured && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                  ⭐ Featured
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            <div className="inline-block mb-4">
              <span className="bg-gray-800 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-bold text-emerald-400">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-6"></div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">
                Description
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Product Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white font-medium capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-emerald-400 font-medium">
                    In Stock
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Product ID:</span>
                  <span className="text-gray-300 font-mono text-sm">
                    {product._id.slice(-8).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 active:scale-95"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>

            {/* Additional Info */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                🚚 Free Shipping
              </span>
              <span className="flex items-center gap-2">
                🔒 Secure Payment
              </span>
              <span className="flex items-center gap-2">
                ↩️ Easy Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;