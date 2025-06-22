
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  name: string;
  count: number;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-lg text-gray-600">Discover books tailored to your interests</p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => onCategoryChange("All")}
            className={selectedCategory === "All" ? "bg-amber-600 hover:bg-amber-700" : ""}
          >
            <Filter className="h-4 w-4 mr-2" />
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => onCategoryChange(category.name)}
              className={selectedCategory === category.name ? "bg-amber-600 hover:bg-amber-700" : ""}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
