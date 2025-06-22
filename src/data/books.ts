
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  description: string;
  isNew: boolean;
  isBestseller: boolean;
  isbn?: string;
  publishedDate?: string;
  publisher?: string;
  pages?: number;
  language?: string;
}

export interface Category {
  name: string;
  count: number;
  color: string;
}

export const categories: Category[] = [
  { name: "Fiction", count: 2847, color: "bg-blue-100 text-blue-800" },
  { name: "Science Fiction", count: 1523, color: "bg-purple-100 text-purple-800" },
  { name: "Romance", count: 3421, color: "bg-pink-100 text-pink-800" },
  { name: "Self-Help", count: 987, color: "bg-green-100 text-green-800" },
  { name: "Business", count: 765, color: "bg-orange-100 text-orange-800" },
  { name: "Mystery", count: 1876, color: "bg-gray-100 text-gray-800" },
];

export const featuredBooks: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 2847,
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600",
    description: "A magical story about life's infinite possibilities and the courage to embrace them.",
    isNew: true,
    isBestseller: true,
    isbn: "978-0525559474",
    publishedDate: "2020-08-13",
    publisher: "Viking",
    pages: 288,
    language: "English"
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert", 
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviews: 5234,
    category: "Science Fiction",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=600",
    description: "Epic science fiction masterpiece set on the desert planet Arrakis.",
    isNew: false,
    isBestseller: true,
    isbn: "978-0441172719",
    publishedDate: "1965-11-01",
    publisher: "Ace Books",
    pages: 688,
    language: "English"
  },
  {
    id: 3,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 22.99,
    originalPrice: 27.99,
    rating: 4.7,
    reviews: 3921,
    category: "Romance",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400&h=600",
    description: "A captivating story of love, ambition, and secrets in old Hollywood.",
    isNew: false,
    isBestseller: false,
    isbn: "978-1501161933",
    publishedDate: "2017-06-13",
    publisher: "Atria Books",
    pages: 400,
    language: "English"
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    price: 21.99,
    originalPrice: 26.99,
    rating: 4.9,
    reviews: 8765,
    category: "Self-Help",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600",
    description: "Transform your life with tiny changes that deliver remarkable results.",
    isNew: true,
    isBestseller: true,
    isbn: "978-0735211292",
    publishedDate: "2018-10-16",
    publisher: "Avery",
    pages: 320,
    language: "English"
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 18.99,
    originalPrice: 23.99,
    rating: 4.6,
    reviews: 2156,
    category: "Business",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400&h=600",
    description: "Timeless lessons on wealth, greed, and happiness that everyone should know.",
    isNew: false,
    isBestseller: true,
    isbn: "978-0857197689",
    publishedDate: "2020-09-08",
    publisher: "Harriman House",
    pages: 256,
    language: "English"
  },
  {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 26.99,
    originalPrice: 31.99,
    rating: 4.8,
    reviews: 4521,
    category: "Science Fiction",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=600",
    description: "A thrilling space adventure about humanity's last hope for survival.",
    isNew: true,
    isBestseller: false,
    isbn: "978-0593135204",
    publishedDate: "2021-05-04",
    publisher: "Ballantine Books",
    pages: 496,
    language: "English"
  },
  {
    id: 7,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 20.99,
    originalPrice: 25.99,
    rating: 4.5,
    reviews: 3456,
    category: "Mystery",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400&h=600",
    description: "A woman's act of violence against her husband and her refusal to speak.",
    isNew: false,
    isBestseller: true,
    isbn: "978-1250301697",
    publishedDate: "2019-02-05",
    publisher: "Celadon Books",
    pages: 336,
    language: "English"
  },
  {
    id: 8,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 23.99,
    originalPrice: 28.99,
    rating: 4.6,
    reviews: 6789,
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600",
    description: "A haunting tale of nature, murder, and the resilience of the human spirit.",
    isNew: false,
    isBestseller: true,
    isbn: "978-0735219090",
    publishedDate: "2018-08-14",
    publisher: "G.P. Putnam's Sons",
    pages: 384,
    language: "English"
  }
];

export const getBooksByCategory = (category: string): Book[] => {
  if (category === "All") return featuredBooks;
  return featuredBooks.filter(book => book.category === category);
};

export const searchBooks = (query: string): Book[] => {
  if (!query) return featuredBooks;
  const lowercaseQuery = query.toLowerCase();
  return featuredBooks.filter(book =>
    book.title.toLowerCase().includes(lowercaseQuery) ||
    book.author.toLowerCase().includes(lowercaseQuery) ||
    book.category.toLowerCase().includes(lowercaseQuery) ||
    book.description.toLowerCase().includes(lowercaseQuery)
  );
};
