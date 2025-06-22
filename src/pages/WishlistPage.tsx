
import { useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface WishlistProps {
  onBack: () => void;
  onAddToCart: (bookId: number) => void;
  onRemoveFromWishlist: (bookId: number) => void;
}

const WishlistPage = ({ onBack, onAddToCart, onRemoveFromWishlist }: WishlistProps) => {
  const { toast } = useToast();
  
  // Sample wishlist data
  const [wishlistItems] = useState([
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.5,
      reviews: 1200,
      category: "Fiction",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.8,
      reviews: 2500,
      category: "Self-Help",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      price: 29.99,
      originalPrice: 34.99,
      rating: 4.7,
      reviews: 3200,
      category: "Science Fiction",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const handleAddToCart = (bookId: number, title: string) => {
    onAddToCart(bookId);
    toast({
      title: "Added to Cart! 🛒",
      description: `"${title}" has been moved from wishlist to cart.`,
    });
  };

  const handleRemoveFromWishlist = (bookId: number, title: string) => {
    onRemoveFromWishlist(bookId);
    toast({
      title: "Removed from Wishlist",
      description: `"${title}" has been removed from your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-700 hover:text-amber-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to BookNest
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📚</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BookNest</h1>
                <p className="text-xs text-amber-600">Where Stories Nestle</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist</h2>
          <p className="text-xl text-gray-600">
            Books you've saved for later - {wishlistItems.length} items
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((book) => (
              <Card key={book.id} className="group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    onClick={() => handleRemoveFromWishlist(book.id, book.title)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {book.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {book.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 font-medium">by {book.author}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {book.rating} ({book.reviews.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">${book.price}</span>
                      <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={() => handleAddToCart(book.id, book.title)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveFromWishlist(book.id, book.title)}
                      className="px-4 hover:bg-red-50 hover:text-red-600"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start adding books you'd like to read later!</p>
            <Button 
              onClick={onBack}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Browse Books
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
