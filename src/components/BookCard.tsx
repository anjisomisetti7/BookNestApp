
import { useState } from "react";
import { Star, Heart, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface BookCardProps {
  book: Book;
  onAddToCart: (bookId: number) => void;
  onToggleWishlist: (bookId: number) => void;
  onBuyNow: (bookId: number) => void;
  isInWishlist: boolean;
}

const categoryColors: Record<string, string> = {
  "Fiction": "bg-blue-100 text-blue-800",
  "Science Fiction": "bg-purple-100 text-purple-800", 
  "Romance": "bg-pink-100 text-pink-800",
  "Self-Help": "bg-green-100 text-green-800",
  "Business": "bg-orange-100 text-orange-800",
  "Mystery": "bg-gray-100 text-gray-800"
};

const BookCard = ({ book, onAddToCart, onToggleWishlist, onBuyNow, isInWishlist }: BookCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(book.id);
    toast({
      title: "Successfully Added to Cart! 🛒",
      description: `"${book.title}" by ${book.author} has been added to your cart. Continue shopping or proceed to checkout when ready!`,
    });
  };

  const handleToggleWishlist = () => {
    onToggleWishlist(book.id);
    toast({
      title: isInWishlist ? "Removed from Wishlist 💔" : "Added to Wishlist ❤️",
      description: `"${book.title}" has been ${isInWishlist ? 'removed from' : 'added to'} your wishlist. ${!isInWishlist ? 'Save it for later or share with friends!' : 'You can always add it back anytime.'}`,
    });
  };

  const handleBuyNow = () => {
    onBuyNow(book.id);
    toast({
      title: "Express Checkout Initiated! ⚡",
      description: `Fast-tracking your purchase of "${book.title}" - redirecting to secure checkout. Your literary adventure awaits!`,
    });
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.isNew && (
            <Badge className="bg-green-500 text-white">New</Badge>
          )}
          {book.isBestseller && (
            <Badge className="bg-amber-500 text-white">Bestseller</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
          onClick={handleToggleWishlist}
        >
          <Heart 
            className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className={categoryColors[book.category] || "bg-gray-100 text-gray-800"}>
            {book.category}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {book.title}
        </CardTitle>
        <p className="text-sm text-gray-600 font-medium">by {book.author}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {book.rating} ({book.reviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${book.price}</span>
            <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleBuyNow}
          >
            <Zap className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
