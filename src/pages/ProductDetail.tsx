
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft, Star, Share2, SendHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductList from "@/components/ui/ProductList";
import { Button } from "@/components/ui/button";
const CONTECT = import.meta.env.VITE_CONTECT;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button 
              onClick={() => navigate(-1)}
              className="btn-outline"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to your wishlist",
      });
      navigate("/auth/login", { state: { from: `/product/${product.id}` } });
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // const handleDirectOrder = () => {
  //   // Create the product URL
  //   const productUrl = `${window.location.origin}/product/${product.id}`;
    
  //   // Create the WhatsApp message with product details
  //   const message = `I'm interested in ordering:\n\n*Product:* ${product.name}\n*Link:* ${productUrl}\n*Price:* $${product.price.toFixed(2)}\n*Quantity:* ${quantity}\n\nPlease assist me with this order.`;
    
  //   // Encode the message for the URL
  //   const encodedMessage = encodeURIComponent(message);
    
  //   // Open WhatsApp with the message
  //   window.open(`https://wa.me/9328345287?text=${encodedMessage}`, '_blank');
    
  //   // Show success toast
  //   toast({
  //     title: "Order initiated",
  //     description: "Redirecting you to WhatsApp to complete your order",
  //   });
  // };


  // const handleDirectOrder = () => {
  //   // Create the product URL
  //   const productUrl = `${window.location.origin}/product/${product.id}`;
  
  //   // Create the WhatsApp message with product details
  //   const message = `I'm interested in ordering:\n\n*Product:* [${product.name}](${productUrl})\n*Price:* $${product.price.toFixed(2)}\n*Quantity:* ${quantity}\n\nPlease assist me with this order.`;
  
  //   // Encode the message for the URL
  //   const encodedMessage = encodeURIComponent(message);
  
  //   // Open WhatsApp with the message
  //   window.open(`https://wa.me/${CONTECT}?text=${encodedMessage}`, '_blank'); 
  
  //   // Show success toast
  //   toast({
  //     title: "Order initiated",
  //     description: "Redirecting you to WhatsApp to complete your order",
  //   });
  // };


  const handleDirectOrder = () => {
    // Create the product URL
    const productUrl = `${window.location.origin}/product/${product.id}`;
  
    // Create the WhatsApp message
    const message = `I'm interested in ordering:\n\n*Product:* ${product.name}\n*Price:* $${product.price.toFixed(2)}\n*Quantity:* ${quantity}\n\n🔗 ${productUrl}\n\nPlease assist me with this order.`;
  
    // Encode the message
    const encodedMessage = encodeURIComponent(message);
  
    // Open WhatsApp with the message
    window.open(`https://wa.me/${CONTECT}?text=${encodedMessage}`, '_blank'); 
  
    // Show success toast
    toast({
      title: "Order initiated",
      description: "Redirecting you to WhatsApp to complete your order",
    });
  };
  
  
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-500">
            <button onClick={() => navigate(-1)} className="flex items-center hover:text-mutedTeal transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to products
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-96 object-cover object-center"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`border rounded-md overflow-hidden ${
                      selectedImage === index ? 'border-mutedTeal' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="text-xs uppercase tracking-wider text-mutedTeal font-medium">
                {product.category}
              </div>
              
              <h1 className="heading-lg mt-2 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(24 reviews)</span>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-medium text-charcoal">
                  ${product.price.toFixed(2)}
                </span>
                
                {product.originalPrice && (
                  <>
                    <span className="ml-3 text-lg text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="ml-3 bg-dustyRose/10 text-dustyRose px-2 py-1 rounded text-sm font-medium">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Availability</h3>
                <p className={`${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                  {product.stock > 0 
                    ? `In Stock (${product.stock} available)` 
                    : "Out of Stock"}
                </p>
              </div>
              
              {product.stock > 0 && (
                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Quantity</h3>
                    <div className="flex items-center">
                      <button
                        onClick={decrementQuantity}
                        className="w-10 h-10 rounded-l border border-r-0 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.stock))}
                        className="w-16 h-10 border-y border-gray-300 text-center focus:outline-none"
                      />
                      <button
                        onClick={incrementQuantity}
                        className="w-10 h-10 rounded-r border border-l-0 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button
                      onClick={handleDirectOrder}
                      className="flex-1 bg-mutedTeal text-white hover:bg-mutedTeal/90"
                      size="lg"
                      disabled={product.stock === 0}
                    >
                      <SendHorizontal size={18} className="mr-2" />
                      Order Now via WhatsApp
                    </Button>
                    
                    <button
                      onClick={handleToggleWishlist}
                      className={`flex-1 flex items-center justify-center border rounded-md py-2 px-4 transition-colors ${
                        isAuthenticated && isInWishlist(product.id)
                          ? "bg-dustyRose text-white border-dustyRose"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Heart
                        size={18}
                        className={`mr-2 ${
                          isAuthenticated && isInWishlist(product.id) ? "fill-white" : ""
                        }`}
                      />
                      {isAuthenticated && isInWishlist(product.id) 
                        ? "Remove from Wishlist" 
                        : "Add to Wishlist"}
                    </button>
                  </div>
                  
                  {/* Share Button */}
                  <button className="flex items-center text-gray-600 hover:text-mutedTeal transition-colors">
                    <Share2 size={18} className="mr-2" />
                    Share this product
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-20">
            <ProductList 
              title="You May Also Like" 
              subtitle="Products similar to this one that our customers love"
              limit={4} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
