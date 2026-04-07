export type Category = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
};

export const CATEGORIES: Category[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Fresh organic farm vegetables.',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Sweet and juicy seasonal fruits.',
  },
  {
    id: 'cakes',
    name: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Delicious freshly baked cakes.',
  },
  {
    id: 'biscuits',
    name: 'Biscuits',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Crunchy sweet and savory biscuits.',
  },
];

export const PRODUCTS: Product[] = [
  // Vegetables
  {
    id: 'p1',
    categoryId: 'vegetables',
    name: 'Organic Carrots',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Fresh organic carrots bundled straight from the farm.',
  },
  {
    id: 'p2',
    categoryId: 'vegetables',
    name: 'Broccoli Crown',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Crisp green broccoli crown, perfect for steaming or roasting.',
  },
  {
    id: 'p3',
    categoryId: 'vegetables',
    name: 'Red Bell Peppers',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Sweet and crunchy red bell peppers.',
  },
  {
    id: 'p4',
    categoryId: 'vegetables',
    name: 'Spinach Bunch',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Nutrient-rich fresh spinach bunch.',
  },
  {
    id: 'p5',
    categoryId: 'vegetables',
    name: 'Avocado',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Ripe Hass avocado, ready to eat.',
  },
  
  // Fruits
  {
    id: 'p6',
    categoryId: 'fruits',
    name: 'Gala Apples',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Sweet and crisp Gala apples by the pound.',
  },
  {
    id: 'p7',
    categoryId: 'fruits',
    name: 'Bananas',
    price: 1.20,
    image: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Yellow organic bananas.',
  },
  {
    id: 'p8',
    categoryId: 'fruits',
    name: 'Strawberries',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Freshly picked bright red strawberries.',
  },
  {
    id: 'p9',
    categoryId: 'fruits',
    name: 'Oranges',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Juicy and sweet navel oranges.',
  },
  {
    id: 'p10',
    categoryId: 'fruits',
    name: 'Pineapple',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Whole ripe tropical pineapple.',
  },

  // Cakes
  {
    id: 'p11',
    categoryId: 'cakes',
    name: 'Chocolate Truffle Cake',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Rich and decadent dark chocolate truffle cake.',
  },
  {
    id: 'p12',
    categoryId: 'cakes',
    name: 'Strawberry Shortcake',
    price: 22.50,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Light vanilla sponge cake with fresh strawberries and cream.',
  },
  {
    id: 'p13',
    categoryId: 'cakes',
    name: 'Cheesecake',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Classic creamy New York cheesecake.',
  },
  {
    id: 'p14',
    categoryId: 'cakes',
    name: 'Red Velvet Cake',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0ea3b1cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Moist red velvet sponge with cream cheese frosting.',
  },
  {
    id: 'p15',
    categoryId: 'cakes',
    name: 'Carrot Cake',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Spiced carrot cake with walnuts and frosting.',
  },

  // Biscuits
  {
    id: 'p16',
    categoryId: 'biscuits',
    name: 'Chocolate Chip Cookies',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Freshly baked soft chocolate chip cookies (1 Dozen).',
  },
  {
    id: 'p17',
    categoryId: 'biscuits',
    name: 'Oatmeal Raisin Biscuits',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Healthy and chewy oatmeal raisin biscuits.',
  },
  {
    id: 'p18',
    categoryId: 'biscuits',
    name: 'Shortbread Biscuits',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1509462700685-1d6da217a149?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Butter-rich, crumbly traditional shortbread.',
  },
  {
    id: 'p19',
    categoryId: 'biscuits',
    name: 'Macarons Assortment',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Assortment of colorful French macarons.',
  },
  {
    id: 'p20',
    categoryId: 'biscuits',
    name: 'Peanut Butter Cookies',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1618923850106-920ebdd4609c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Classic crunchy and sweet peanut butter cookies.',
  },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'John Customer', email: 'customer@example.com', role: 'customer' },
  { id: 'a1', name: 'Admin Jane', email: 'admin@example.com', role: 'admin' },
];
