import React, { useState } from 'react';
import { Menu, X, ChefHat } from 'lucide-react';
import Button from '../ui/Button';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Cuisines', page: 'cuisines' },
    { name: 'Contact', page: 'contact' }
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigation('home')}
          >
            <ChefHat className="h-8 w-8 text-amber-500 mr-2" />
            <span className="text-xl font-bold text-gray-900">
              Global Cuisines
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigation(link.page)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-amber-600 ${
                  currentPage === link.page 
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavigation('cuisines')}
            >
              Explore Events
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              icon={isMenuOpen ? X : Menu}
              onClick={toggleMenu}
              className="!p-2 border-none"
            />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavigation(link.page)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-amber-50 hover:text-amber-600 rounded-md ${
                    currentPage === link.page 
                      ? 'text-amber-600 bg-amber-50' 
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => handleNavigation('cuisines')}
                >
                  Explore Events
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;