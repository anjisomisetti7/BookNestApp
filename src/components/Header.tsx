
import { useState } from "react";
import { Search, ShoppingCart, Menu, User, Heart, List, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItems: number;
  onShowOrderHistory: () => void;
  onCartClick: () => void;
  onSignInClick: () => void;
  onCategoriesClick: () => void;
  isSignedIn: boolean;
  userEmail: string;
  onWishlistClick: () => void;
}

const Header = ({
  searchQuery,
  onSearchChange,
  cartItems,
  onShowOrderHistory,
  onCartClick,
  onSignInClick,
  onCategoriesClick,
  isSignedIn,
  userEmail,
  onWishlistClick,
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getUserInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-amber-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BookNest</h1>
              <p className="text-xs text-amber-600">Where Stories Nestle</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onCategoriesClick}
                className="text-gray-700 hover:text-amber-600"
              >
                <List className="h-4 w-4 mr-2" />
                Categories
              </Button>
              
              {isSignedIn && (
                <Button
                  variant="ghost"
                  onClick={onWishlistClick}
                  className="text-gray-700 hover:text-amber-600"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={onShowOrderHistory}
                className="text-gray-700 hover:text-amber-600"
              >
                Order History
              </Button>
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-amber-600"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-amber-100">
                    <span className="text-amber-800 font-semibold">
                      {getUserInitial(userEmail)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{userEmail}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Signed in
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onWishlistClick}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Wishlist</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onShowOrderHistory}>
                    <span>Order History</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={onSignInClick}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-amber-200 py-4">
            <div className="flex flex-col space-y-2">
              <div className="px-3 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={onCategoriesClick}
                className="justify-start text-gray-700 hover:text-amber-600"
              >
                <List className="h-4 w-4 mr-2" />
                Categories
              </Button>
              {isSignedIn && (
                <Button
                  variant="ghost"
                  onClick={onWishlistClick}
                  className="justify-start text-gray-700 hover:text-amber-600"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={onShowOrderHistory}
                className="justify-start text-gray-700 hover:text-amber-600"
              >
                Order History
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
