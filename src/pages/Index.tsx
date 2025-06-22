import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import BookCard from "@/components/BookCard";
import OrderHistory from "@/components/OrderHistory";
import CheckoutPage from "@/components/CheckoutPage";
import CartView from "@/components/CartView";
import OrderConfirmation from "@/components/OrderConfirmation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Categories from "./Categories";
import BookDetails from "./BookDetails";
import NewsletterSuccess from "./NewsletterSuccess";
import UserProfile from "./UserProfile";
import WishlistPage from "./WishlistPage";
import BestsellersPage from "./BestsellersPage";
import BookListings from "./BookListings";
import QuickLinksPage from "./QuickLinksPage";
import { featuredBooks, categories, searchBooks, getBooksByCategory } from "@/data/books";

// Sample order data - in a real app, this would come from your backend
const sampleOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered" as const,
    total: 67.97,
    items: [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
        quantity: 1
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee", 
        price: 22.99,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
        quantity: 1
      }
    ]
  },
  {
    id: "ORD-2024-002", 
    date: "2024-01-10",
    status: "shipping" as const,
    total: 29.99,
    items: [
      {
        id: 3,
        title: "Dune",
        author: "Frank Herbert",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
        quantity: 1
      }
    ]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'cart' | 'checkout' | 'confirmation' | 'signin' | 'signup' | 'categories' | 'bookDetails' | 'newsletterSuccess' | 'userProfile' | 'wishlist' | 'bestsellers' | 'bookListings' | 'quickLinks'>('home');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const toggleWishlist = (bookId: number) => {
    setWishlist(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const addToCart = (bookId: number) => {
    const book = featuredBooks.find(b => b.id === bookId);
    if (book) {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === bookId);
        if (existingItem) {
          return prev.map(item =>
            item.id === bookId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { ...book, quantity: 1 }];
        }
      });
    }
  };

  const buyNow = (bookId: number) => {
    const book = featuredBooks.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentView('checkout');
    }
  };

  const handleViewOrder = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing complete details for order ${orderId} including tracking information.`,
    });
  };

  const handleRateBook = (bookId: number) => {
    toast({
      title: "Rate Your Purchase",
      description: "Share your reading experience! Your review helps other book lovers discover great reads.",
    });
  };

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleSignInClick = () => {
    setCurrentView('signin');
  };

  const handleCategoriesClick = () => {
    setCurrentView('categories');
  };

  const handleSignInSuccess = (email: string) => {
    setIsSignedIn(true);
    setUserEmail(email);
  };

  const handleSignUpSuccess = (email: string) => {
    setIsSignedIn(true);
    setUserEmail(email);
  };

  const handleShowSignUp = () => {
    setCurrentView('signup');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCartCheckout = () => {
    if (cartItems.length > 0) {
      setSelectedBook(cartItems[0]);
      setCurrentView('checkout');
    }
  };

  const handleOrderComplete = (details: any) => {
    setOrderDetails(details);
    setCurrentView('confirmation');
    setCartItems([]);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setShowOrderHistory(false);
    setSelectedBook(null);
    setOrderDetails(null);
  };

  const handleNewsletterSubscribe = () => {
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setCurrentView('newsletterSuccess');
      setNewsletterEmail("");
      toast({
        title: "Successfully Subscribed! 📧",
        description: "Thank you for subscribing to our newsletter.",
      });
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  const handleWishlistClick = () => {
    setCurrentView('wishlist');
  };

  const handleQuickLinksClick = () => {
    setCurrentView('quickLinks');
  };

  const getFilteredBooks = () => {
    let filtered = featuredBooks;
    
    if (selectedCategory !== "All") {
      filtered = getBooksByCategory(selectedCategory);
    }
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery) ||
        book.category.toLowerCase().includes(lowercaseQuery) ||
        book.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    return filtered;
  };

  const filteredBooks = getFilteredBooks();

  if (currentView === 'signin') {
    return (
      <SignIn 
        onBack={handleBackToHome} 
        onSignInSuccess={handleSignInSuccess}
        onShowSignUp={handleShowSignUp}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignUp 
        onBack={handleBackToHome} 
        onSignUpSuccess={handleSignUpSuccess}
      />
    );
  }

  if (currentView === 'categories') {
    return (
      <Categories 
        onBack={handleBackToHome}
        onCategorySelect={handleCategorySelect}
      />
    );
  }

  if (currentView === 'bookDetails' && selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        onBack={handleBackToHome}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onBuyNow={buyNow}
        isInWishlist={wishlist.includes(selectedBook.id)}
      />
    );
  }

  if (currentView === 'newsletterSuccess') {
    return (
      <NewsletterSuccess
        onBack={handleBackToHome}
        email={userEmail || newsletterEmail}
      />
    );
  }

  if (currentView === 'userProfile') {
    return (
      <UserProfile
        onBack={handleBackToHome}
        userEmail={userEmail}
        onWishlistClick={handleWishlistClick}
      />
    );
  }

  if (currentView === 'wishlist') {
    return (
      <WishlistPage
        onBack={handleBackToHome}
        onAddToCart={addToCart}
        onRemoveFromWishlist={toggleWishlist}
      />
    );
  }

  if (currentView === 'bestsellers') {
    return (
      <BestsellersPage
        onBack={handleBackToHome}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onBuyNow={buyNow}
        wishlist={wishlist}
      />
    );
  }

  if (currentView === 'bookListings') {
    return (
      <BookListings
        onBack={handleBackToHome}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onBuyNow={buyNow}
        wishlist={wishlist}
      />
    );
  }

  if (currentView === 'quickLinks') {
    return (
      <QuickLinksPage
        onBack={handleBackToHome}
        onCategoriesClick={handleCategoriesClick}
        onBestsellersClick={() => setCurrentView('bestsellers')}
        onBookListingsClick={() => setCurrentView('bookListings')}
      />
    );
  }

  if (currentView === 'checkout') {
    return (
      <CheckoutPage
        book={selectedBook}
        onBack={handleBackToHome}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentView === 'cart') {
    return (
      <CartView
        cartItems={cartItems}
        onBack={handleBackToHome}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCartCheckout}
      />
    );
  }

  if (currentView === 'confirmation') {
    return (
      <OrderConfirmation
        orderDetails={orderDetails}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Header */}
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItems={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onShowOrderHistory={() => setShowOrderHistory(!showOrderHistory)}
        onCartClick={handleCartClick}
        onSignInClick={handleSignInClick}
        onCategoriesClick={handleCategoriesClick}
        isSignedIn={isSignedIn}
        userEmail={userEmail}
        onWishlistClick={handleWishlistClick}
      />

      {/* Main Content */}
      {showOrderHistory ? (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setShowOrderHistory(false)}
                className="mb-4"
              >
                ← Back to Books
              </Button>
            </div>
            <OrderHistory 
              orders={sampleOrders}
              onViewOrder={handleViewOrder}
              onRateBook={handleRateBook}
            />
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-amber-100 via-blue-50 to-purple-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-amber-600">BookNest</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Where Stories Nestle. Discover your next favorite read in our curated collection of literary treasures. 
                From timeless classics to contemporary bestsellers, find the perfect book for every moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  Browse Books
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3"
                  onClick={() => setCurrentView('categories')}
                >
                  View Categories
                </Button>
              </div>
            </div>
          </section>

          {/* Categories */}
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Featured Books */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Books</h2>
                <p className="text-lg text-gray-600">Handpicked selections from our literary curators</p>
                {searchQuery && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {filteredBooks.length} results for "{searchQuery}"
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    onBuyNow={buyNow}
                    isInWishlist={wishlist.includes(book.id)}
                  />
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-600 mb-2">No books found</h3>
                  <p className="text-gray-500">
                    {searchQuery 
                      ? `No books match "${searchQuery}". Try adjusting your search terms.`
                      : "Try adjusting your category filter"
                    }
                  </p>
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="py-16 bg-amber-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to our newsletter for the latest book recommendations, exclusive deals, and literary news.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2"
                  onClick={handleNewsletterSubscribe}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpen className="h-8 w-8 text-amber-400" />
                    <div>
                      <h3 className="text-2xl font-bold">BookNest</h3>
                      <p className="text-amber-400 text-sm">Where Stories Nestle</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 max-w-md">
                    Your digital haven for discovering, exploring, and collecting the world's greatest stories. 
                    Where every book finds its perfect reader.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><button onClick={handleQuickLinksClick} className="hover:text-amber-400 transition-colors">Browse Books</button></li>
                    <li><button onClick={() => setCurrentView('categories')} className="hover:text-amber-400 transition-colors">Categories</button></li>
                    <li><button onClick={() => setCurrentView('bestsellers')} className="hover:text-amber-400 transition-colors">Bestsellers</button></li>
                    <li><button onClick={() => setCurrentView('bookListings')} className="hover:text-amber-400 transition-colors">New Releases</button></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Account</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><button onClick={handleSignInClick} className="hover:text-amber-400 transition-colors">Sign In</button></li>
                    <li><button onClick={handleShowSignUp} className="hover:text-amber-400 transition-colors">Register</button></li>
                    <li><button onClick={() => setShowOrderHistory(true)} className="hover:text-amber-400 transition-colors">Order History</button></li>
                    <li><button onClick={handleWishlistClick} className="hover:text-amber-400 transition-colors">Wishlist</button></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                <p className="text-gray-400">
                  © 2024 BookNest. All rights reserved. Where every story finds its home.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
