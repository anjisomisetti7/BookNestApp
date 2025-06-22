
import { useState } from "react";
import { ArrowLeft, BookOpen, Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookListingsProps {
  onBack: () => void;
}

const BookListings = ({ onBack }: BookListingsProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [filterCategory, setFilterCategory] = useState("all");

  // Sample book statistics
  const bookStats = {
    total: 12547,
    categories: {
      "Fiction": 3521,
      "Science Fiction": 1892,
      "Romance": 2134,
      "Mystery": 1456,
      "Self-Help": 1876,
      "Business": 987,
      "Biography": 681
    },
    newThisWeek: 47,
    trending: 156,
    onSale: 234
  };

  const categoryColors: Record<string, string> = {
    "Fiction": "bg-blue-100 text-blue-800",
    "Science Fiction": "bg-purple-100 text-purple-800",
    "Romance": "bg-pink-100 text-pink-800",
    "Mystery": "bg-gray-100 text-gray-800",
    "Self-Help": "bg-green-100 text-green-800",
    "Business": "bg-orange-100 text-orange-800",
    "Biography": "bg-yellow-100 text-yellow-800"
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

      {/* Book Listings Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Collection</h2>
          <p className="text-xl text-gray-600">
            Discover from our extensive library of {bookStats.total.toLocaleString()} books
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Books</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by title, author, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.keys(bookStats.categories).map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">
                {bookStats.newThisWeek} New This Week
              </Badge>
              <Badge className="bg-green-100 text-green-800">
                {bookStats.trending} Trending
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                {bookStats.onSale} On Sale
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{bookStats.total.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Total Books Available</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{Object.keys(bookStats.categories).length}</div>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{bookStats.newThisWeek}</div>
                <p className="text-sm text-gray-600">New This Week</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{bookStats.onSale}</div>
                <p className="text-sm text-gray-600">Books on Sale</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Books by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(bookStats.categories).map(([category, count]) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Badge className={categoryColors[category] || "bg-gray-100 text-gray-800"}>
                      {category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{count.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">books</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Searches */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Popular Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Stephen King", "Romance novels", "Self-improvement", "Mystery thriller", "Science fiction", "Historical fiction", "Young adult", "Business books"].map((search) => (
                <Badge
                  key={search}
                  variant="outline"
                  className="cursor-pointer hover:bg-amber-50 hover:border-amber-300"
                  onClick={() => setSearchTerm(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookListings;
