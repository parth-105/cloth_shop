export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  color: string;
  isNew?: boolean;
  isFeatured?: boolean;
  stock: number;
};

export type User = {
  id: string;
  name: string;
  mobile: string;
  password: string;
  isAdmin: boolean;
  isApproved?: boolean;
  isPendingApproval?: boolean;
};

export type HeroImage = {
  id: string;
  url: string;
  title: string;
  subtitle: string;
};

export let heroImages: HeroImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Timeless Elegance",
    subtitle: "Discover our latest collection"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    title: "Modern Style",
    subtitle: "Premium quality for every occasion"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    title: "Summer Collection",
    subtitle: "Light fabrics for warm days"
  }
];

export const updateHeroImages = (newImages: HeroImage[]): void => {
  heroImages = newImages;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Cotton Shirt",
    description: "Crafted from premium organic cotton, this oversized shirt offers both comfort and style. Perfect for casual outings or a relaxed office environment.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80",
      "https://images.unsplash.com/photo-1618354691438-25bc04584c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80",
    ],
    category: "shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "White",
    isNew: true,
    isFeatured: true,
    stock: 10,
  },
  {
    id: "2",
    name: "Slim Fit Wool Trousers",
    description: "Elegantly tailored slim-fit trousers made from high-quality wool blend. Featuring a comfortable waistband and classic design that transitions seamlessly from office to evening.",
    price: 129.99,
    originalPrice: 159.99,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      "https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    ],
    category: "pants",
    sizes: ["30", "32", "34", "36", "38"],
    color: "Charcoal",
    isFeatured: true,
    stock: 8,
  },
  {
    id: "3",
    name: "Cashmere Blend Sweater",
    description: "Luxuriously soft cashmere blend sweater with ribbed cuffs and hem. This versatile piece offers exceptional warmth and comfort without sacrificing style.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    ],
    category: "sweaters",
    sizes: ["XS", "S", "M", "L"],
    color: "Cream",
    stock: 5,
  },
  {
    id: "4",
    name: "Linen Summer Dress",
    description: "A breathable linen dress perfect for warm days. Features adjustable straps and a flattering cut that moves elegantly with your body.",
    price: 119.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=783&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    ],
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    color: "Natural",
    isNew: true,
    stock: 12,
  },
  {
    id: "5",
    name: "Tailored Wool Blazer",
    description: "A timeless tailored blazer crafted from premium Italian wool. This structured piece features a slim fit, notched lapels, and subtle detailing.",
    price: 199.99,
    originalPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1611485988300-b7ef6c1766e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    ],
    category: "jackets",
    sizes: ["S", "M", "L", "XL"],
    color: "Navy",
    isFeatured: true,
    stock: 7,
  },
  {
    id: "6",
    name: "Silk Evening Blouse",
    description: "An elegant pure silk blouse with delicate draping and mother-of-pearl buttons. The perfect statement piece for evening occasions.",
    price: 169.99,
    images: [
      "https://images.unsplash.com/photo-1566958769143-c4e8296d645c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
      "https://images.unsplash.com/photo-1557831863-3892e309ee27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    ],
    category: "blouses",
    sizes: ["XS", "S", "M", "L"],
    color: "Ivory",
    stock: 6,
  },
  {
    id: "7",
    name: "Relaxed Fit Jeans",
    description: "Contemporary relaxed fit jeans with a vintage wash. Made from premium denim with a touch of stretch for all-day comfort.",
    price: 109.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=926&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    ],
    category: "jeans",
    sizes: ["28", "30", "32", "34", "36"],
    color: "Light Blue",
    isNew: true,
    stock: 15,
  },
  {
    id: "8",
    name: "Merino Wool Cardigan",
    description: "A luxurious merino wool cardigan featuring a relaxed silhouette and horn buttons. Perfect for layering in any season.",
    price: 139.99,
    images: [
      "https://images.unsplash.com/photo-1600434481849-7011a689fac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1599838082471-71ca6af837e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    ],
    category: "sweaters",
    sizes: ["S", "M", "L", "XL"],
    color: "Taupe",
    stock: 9,
  }
];

export let users: User[] = [
  {
    id: "1",
    name: "Head Admin",
    mobile: "1234567890",
    password: "1234567890@", // In a real app, this would be hashed
    isAdmin: true,
    isApproved: true,
  },
  {
    id: "2",
    name: "Customer User",
    mobile: "0987654321",
    password: "Customer@123", // In a real app, this would be hashed
    isAdmin: false,
    isApproved: true,
  },
];

export const categories = [
  "all",
  "shirts",
  "pants",
  "dresses",
  "sweaters",
  "jackets",
  "blouses",
  "jeans",
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const validateUser = (mobile: string, password: string): User | undefined => {
  const user = users.find(user => user.mobile === mobile && user.password === password);
  
  if (user && user.isAdmin && !user.isApproved) {
    return { ...user, isPendingApproval: true };
  }
  
  return user;
};

export const getHeroImages = (): HeroImage[] => {
  return heroImages;
};

export const getPendingAdminRequests = (): User[] => {
  return users.filter(user => user.isAdmin && !user.isApproved);
};

export const approveAdmin = (userId: string): boolean => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) return false;
  
  users[userIndex] = { ...users[userIndex], isApproved: true };
  return true;
};

export const rejectAdmin = (userId: string): boolean => {
  users = users.filter(user => user.id !== userId);
  return true;
};

export const addUser = (user: User): void => {
  if (user.mobile === "1234567890" && user.isAdmin) {
    user.isApproved = true;
  } else if (user.isAdmin) {
    user.isApproved = false;
  } else {
    user.isApproved = true;
  }
  
  users.push(user);
};
