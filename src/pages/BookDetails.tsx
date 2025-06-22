
import { useState } from "react";
import { ArrowLeft, Star, Heart, ShoppingCart, Zap, Users, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Book {
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
}

interface BookDetailsProps {
  book: Book;
  onBack: () => void;
  onAddToCart: (bookId: number) => void;
  onToggleWishlist: (bookId: number) => void;
  onBuyNow: (bookId: number) => void;
  isInWishlist: boolean;
}

const BookDetails = ({ book, onBack, onAddToCart, onToggleWishlist, onBuyNow, isInWishlist }: BookDetailsProps) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(book.id);
    toast({
      title: "Added to Cart! 🛒",
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    onToggleWishlist(book.id);
    toast({
      title: isInWishlist ? "Removed from Wishlist" : "Added to Wishlist ❤️",
      description: `"${book.title}" ${isInWishlist ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const handleBuyNow = () => {
    onBuyNow(book.id);
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
              Back to Books
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

      {/* Book Details Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Book Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-2xl">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {book.category}
                </Badge>
                {book.isNew && (
                  <Badge className="bg-green-500 text-white">New</Badge>
                )}
                {book.isBestseller && (
                  <Badge className="bg-amber-500 text-white">Bestseller</Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-lg text-gray-600">
                    {book.rating} ({book.reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">${book.price}</span>
                <span className="text-xl text-gray-500 line-through">${book.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800">
                  Save ${(book.originalPrice - book.price).toFixed(2)}
                </Badge>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleBuyNow}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleToggleWishlist}
                  className="px-4"
                >
                  <Heart 
                    className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  About This Book
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-amber-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Readers</p>
                      <p className="font-semibold">{book.reviews.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold">{book.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
