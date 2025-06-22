
import { ArrowLeft, BookOpen, Star, TrendingUp, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickLinksPageProps {
  onBack: () => void;
  onCategoriesClick: () => void;
  onBestsellersClick: () => void;
  onBookListingsClick: () => void;
}

const QuickLinksPage = ({ 
  onBack, 
  onCategoriesClick, 
  onBestsellersClick, 
  onBookListingsClick 
}: QuickLinksPageProps) => {
  const quickLinks = [
    {
      title: "Browse Categories",
      description: "Explore books by genre and category",
      icon: Grid3X3,
      onClick: onCategoriesClick,
      color: "bg-blue-500"
    },
    {
      title: "Bestsellers",
      description: "Discover the most popular books",
      icon: TrendingUp,
      onClick: onBestsellersClick,
      color: "bg-green-500"
    },
    {
      title: "New Releases",
      description: "Check out the latest book arrivals",
      icon: Star,
      onClick: onBookListingsClick,
      color: "bg-purple-500"
    },
    {
      title: "All Books",
      description: "Browse our complete collection",
      icon: BookOpen,
      onClick: onBookListingsClick,
      color: "bg-amber-500"
    }
  ];

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

      {/* Quick Links Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <p className="text-xl text-gray-600">
            Fast access to all your favorite book browsing options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickLinks.map((link, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={link.onClick}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${link.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {link.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{link.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-amber-600 text-amber-600 hover:bg-amber-50"
                >
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Quick Access Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Popular Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Search by Author</h4>
              <p className="text-gray-600 mb-4">Find books by your favorite authors</p>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                Search Authors
              </Button>
            </Card>
            
            <Card className="text-center p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Browse by Rating</h4>
              <p className="text-gray-600 mb-4">Discover highly rated books</p>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                View Top Rated
              </Button>
            </Card>
            
            <Card className="text-center p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Popular Genres</h4>
              <p className="text-gray-600 mb-4">Explore trending book genres</p>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                Browse Genres
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksPage;
