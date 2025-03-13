
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, User, Menu, X, LogOut, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleAuthAction = (path: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to continue",
      });
      navigate("/auth/login", { state: { from: path } });
      return false;
    }
    return true;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-light text-charcoal">
            <span className="font-medium">ELEG</span>ANT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-charcoal hover:text-mutedTeal transition-colors duration-300"
            >
              Home
            </Link>
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-charcoal hover:text-mutedTeal transition-colors duration-300"
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link
                  to="/profile"
                  className="text-charcoal hover:text-mutedTeal transition-colors duration-300"
                >
                  <User size={20} />
                </Link>
                <Link
                  to="/wishlist"
                  className="text-charcoal hover:text-mutedTeal transition-colors duration-300"
                >
                  <Heart size={20} />
                </Link>
                <Link
                  to="/cart"
                  className="text-charcoal hover:text-mutedTeal transition-colors duration-300 relative"
                >
                  <ShoppingBag size={20} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-dustyRose text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <button
                  onClick={logout}
                  className="text-charcoal hover:text-dustyRose transition-colors duration-300"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-charcoal hover:text-mutedTeal transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/wishlist"
                  className="text-charcoal hover:text-mutedTeal transition-colors duration-300"
                >
                  <Heart size={20} />
                </Link>
                <Link
                  to="/cart"
                  className="text-charcoal hover:text-mutedTeal transition-colors duration-300"
                >
                  <ShoppingBag size={20} />
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-charcoal hover:text-mutedTeal transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                to="/"
                className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
              >
                Home
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
                >
                  Dashboard
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
                  >
                    Cart
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-left text-charcoal hover:text-dustyRose transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/wishlist"
                    className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    className="p-2 text-charcoal hover:text-mutedTeal transition-colors duration-300"
                  >
                    Cart
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
