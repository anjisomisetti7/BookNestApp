
import { useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/books";

interface CategoriesProps {
  onBack: () => void;
  onCategorySelect: (category: string) => void;
}

const Categories = ({ onBack, onCategorySelect }: CategoriesProps) => {
  const handleCategoryClick = (categoryName: string) => {
    onCategorySelect(categoryName);
    onBack(); // Go back to main page with selected category
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

      {/* Categories Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Categories</h2>
          <p className="text-xl text-gray-600">Discover books by your favorite genres</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-amber-100"
            >
              <div className="p-8 text-center">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${category.color}`}
                >
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.count} books available</p>
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.name);
                  }}
                >
                  Explore {category.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* All Categories Option */}
        <div className="mt-8 text-center">
          <div
            onClick={() => handleCategoryClick("All")}
            className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 text-white p-8 max-w-md mx-auto"
          >
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold mb-2">Browse All Books</h3>
            <p className="mb-4">Explore our complete collection</p>
            <Button 
              variant="outline"
              className="bg-white text-amber-600 hover:bg-amber-50 border-white"
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick("All");
              }}
            >
              View All Books
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
