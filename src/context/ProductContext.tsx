
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products as initialProducts } from "../lib/data";
import { useToast } from "@/hooks/use-toast";

type ProductContextType = {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  currentCategory: string;
  setCategory: (category: string) => void;
  searchProducts: (query: string) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  sortProducts: (sortType: "price-asc" | "price-desc" | "name-asc" | "name-desc") => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const setCategory = (category: string) => {
    setCurrentCategory(category);
    
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const searchProducts = (query: string) => {
    if (!query.trim()) {
      setCategory(currentCategory);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const results = products.filter(product => {
      return (
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery)
      );
    });
    
    setFilteredProducts(results);
  };

  const sortProducts = (sortType: "price-asc" | "price-desc" | "name-asc" | "name-desc") => {
    let sortedProducts = [...filteredProducts];
    
    switch (sortType) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    setFilteredProducts(sortedProducts);
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    
    // Update filtered products if we're showing all or the product's category
    if (currentCategory === "all" || currentCategory === product.category) {
      setFilteredProducts(prevFiltered => [...prevFiltered, newProduct]);
    }
    
    toast({
      title: "Product added",
      description: `${product.name} has been added to the store`,
    });
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, ...updatedFields } : product
      )
    );
    
    setFilteredProducts(prevFiltered => 
      prevFiltered.map(product => 
        product.id === id ? { ...product, ...updatedFields } : product
      )
    );
    
    toast({
      title: "Product updated",
      description: `The product has been successfully updated`,
    });
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find(product => product.id === id);
    
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== id)
    );
    
    setFilteredProducts(prevFiltered => 
      prevFiltered.filter(product => product.id !== id)
    );
    
    toast({
      title: "Product deleted",
      description: productToDelete 
        ? `${productToDelete.name} has been removed from the store` 
        : `The product has been removed from the store`,
    });
  };

  const value = {
    products,
    filteredProducts,
    loading,
    currentCategory,
    setCategory,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    sortProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
