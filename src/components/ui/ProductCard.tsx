
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SendHorizontal, Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDirectOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create the product URL
    const productUrl = `${window.location.origin}/product/${product.id}`;
    
    // Create the WhatsApp message with product details
    const message = `I'm interested in ordering:\n\n*Product:* ${product.name}\n*Link:* ${productUrl}\n*Price:* $${product.price.toFixed(2)}\n*Quantity:* 1\n\nPlease assist me with this order.`;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');
    
    // Show success toast
    toast({
      title: "Order initiated",
      description: "Redirecting you to WhatsApp to complete your order",
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
        
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-champagne/90 backdrop-blur-sm text-charcoal text-xs font-medium px-2.5 py-1 rounded-full">
              New Arrival
            </span>
          </div>
        )}
        
        {product.originalPrice && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-dustyRose/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Sale
            </span>
          </div>
        )}
        
        {/* Product Actions - Direct Order & Wishlist */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
          <motion.button
            onClick={handleDirectOrder}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-mutedTeal text-white p-2 rounded-full shadow-md hover:bg-mutedTeal/90 transition-all duration-300"
            aria-label="Order now"
          >
            <SendHorizontal size={20} />
          </motion.button>
          
          <motion.button
            onClick={handleToggleWishlist}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full shadow-md transition-all duration-300 ${
              isAuthenticated && isInWishlist(product.id) 
                ? 'bg-dustyRose text-white' 
                : 'bg-white text-charcoal hover:bg-dustyRose/10'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={20} className={isAuthenticated && isInWishlist(product.id) ? 'fill-white' : ''} />
          </motion.button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 text-xs text-mutedTeal font-medium uppercase tracking-wider">
          {product.category}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-charcoal mb-1 transition-colors duration-200 group-hover:text-mutedTeal">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            {product.originalPrice ? (
              <>
                <span className="text-dustyRose font-medium">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-medium text-charcoal">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            {product.stock > 0 ? (
              product.stock < 5 ? (
                <span className="text-dustyRose">Only {product.stock} left</span>
              ) : (
                <span>In stock</span>
              )
            ) : (
              <span className="text-red-500">Out of stock</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-mutedTeal to-dustyRose transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
    </motion.div>
  );
};

export default ProductCard;
