
import { useState } from "react";
import { ArrowLeft, Star, Heart, ShoppingCart, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface BestsellersProps {
  onBack: () => void;
  onAddToCart: (bookId: number) => void;
  onToggleWishlist: (bookId: number) => void;
  onBuyNow: (bookId: number) => void;
}

const BestsellersPage = ({ onBack, onAddToCart, onToggleWishlist, onBuyNow }: BestsellersProps) => {
  const { toast } = useToast();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  // Sample bestsellers data
  const bestsellers = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: 26.99,
      originalPrice: 29.99,
      rating: 4.9,
      reviews: 15420,
      category: "Fiction",
      rank: 1,
      weeksOnList: 52,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.8,
      reviews: 28500,
      category: "Self-Help",
      rank: 2,
      weeksOnList: 78,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      price: 24.99,
      originalPrice: 28.99,
      rating: 4.7,
      reviews: 22100,
      category: "Fiction",
      rank: 3,
      weeksOnList: 65,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 22.99,
      originalPrice: 26.99,
      rating: 4.6,
      reviews: 18900,
      category: "Fiction",
      rank: 4,
      weeksOnList: 43,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      price: 23.99,
      originalPrice: 27.99,
      rating: 4.8,
      reviews: 31200,
      category: "Biography",
      rank: 5,
      weeksOnList: 89,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 21.99,
      originalPrice: 25.99,
      rating: 4.5,
      reviews: 16800,
      category: "Mystery",
      rank: 6,
      weeksOnList: 34,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleAddToCart = (bookId: number, title: string) => {
    onAddToCart(bookId);
    toast({
      title: "Added to Cart! 🛒",
      description: `"${title}" has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (bookId: number, title: string) => {
    const isInWishlist = wishlistIds.includes(bookId);
    if (isInWishlist) {
      setWishlistIds(prev => prev.filter(id => id !== bookId));
    } else {
      setWishlistIds(prev => [...prev, bookId]);
    }
    onToggleWishlist(bookId);
    toast({
      title: isInWishlist ? "Removed from Wishlist" : "Added to Wishlist ❤️",
      description: `"${title}" ${isInWishlist ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const handleBuyNow = (bookId: number) => {
    onBuyNow(bookId);
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return "bg-yellow-500";
    if (rank <= 6) return "bg-gray-400";
    return "bg-amber-600";
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

      {/* Bestsellers Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bestsellers</h2>
          <p className="text-xl text-gray-600">
            The most popular books loved by readers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((book) => (
            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Rank Badge */}
              <div className={`absolute top-4 left-4 ${getRankColor(book.rank)} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg z-10`}>
                {book.rank}
              </div>
              
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
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
                  onClick={() => handleToggleWishlist(book.id, book.title)}
                >
                  <Heart 
                    className={`h-4 w-4 ${wishlistIds.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    {book.category}
                  </Badge>
                  <Badge className="bg-red-100 text-red-800">
                    <Crown className="h-3 w-3 mr-1" />
                    #{book.rank} Bestseller
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {book.title}
                </CardTitle>
                <p className="text-sm text-gray-600 font-medium">by {book.author}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center mb-3">
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

                <div className="bg-amber-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-amber-800 font-medium">
                    📈 {book.weeksOnList} weeks on bestseller list
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">${book.price}</span>
                    <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50"
                    onClick={() => handleAddToCart(book.id, book.title)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => handleBuyNow(book.id)}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellersPage;
