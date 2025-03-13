import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductList from "@/components/ui/ProductList";
import ProductFilter from "@/components/ui/ProductFilter";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HeroSlider from "@/components/ui/HeroSlider";
import { getHeroImages } from "@/lib/data";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  const heroImages = getHeroImages();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSlider images={heroImages} />
      
      {/* Featured Categories */}
      <AnimatedSection className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-2">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collections tailored to meet your every need, from casual elegance to refined sophistication.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1 */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative h-96 overflow-hidden rounded-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
              alt="Formal Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
              <h3 className="text-xl font-medium text-white mb-2">Formal Collection</h3>
              <a href="#" className="inline-block text-white border-b border-white/60 hover:border-white transition-colors">
                Explore
              </a>
            </div>
          </motion.div>
          
          {/* Category 2 */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative h-96 overflow-hidden rounded-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
              alt="Casual Edit" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
              <h3 className="text-xl font-medium text-white mb-2">Casual Edit</h3>
              <a href="#" className="inline-block text-white border-b border-white/60 hover:border-white transition-colors">
                Explore
              </a>
            </div>
          </motion.div>
          
          {/* Category 3 */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative h-96 overflow-hidden rounded-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80" 
              alt="Accessories" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
              <h3 className="text-xl font-medium text-white mb-2">Accessories</h3>
              <a href="#" className="inline-block text-white border-b border-white/60 hover:border-white transition-colors">
                Explore
              </a>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Featured Products Section */}
      <section id="featured" className="bg-warmSand/10 py-20">
        <AnimatedSection>
          <ProductList
            title="Featured Products"
            subtitle="Our most popular pieces, selected for their exceptional design and quality."
            limit={4}
          />
        </AnimatedSection>
      </section>
      
      {/* All Products Section */}
      <section id="products" className="py-16">
        <AnimatedSection className="container mx-auto px-4 mb-8">
          <h2 className="heading-lg text-center mb-8">Our Collection</h2>
        </AnimatedSection>
        
        <ProductFilter />
        <ProductList title="" />
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-champagne/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="heading-md mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-6">
                Be the first to know about new collections, special offers, and exclusive events.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input-field flex-1"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
