import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Clock } from 'lucide-react';
import EventCard from '../components/EventCard';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { cuisineEvents, CuisineEvent } from '../data/cuisines';

interface CuisinesProps {
  onNavigate: (page: string, eventId?: string) => void;
}

const Cuisines: React.FC<CuisinesProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(false);
  
  const categories = ['All', 'Workshop', 'Tasting', 'Festival', 'Masterclass'];
  const countries = ['All', ...Array.from(new Set(cuisineEvents.map(event => event.country)))];
  
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = cuisineEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.chef.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || event.country === selectedCountry;
      
      return matchesSearch && matchesCategory && matchesCountry;
    });
    
    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
          return b.currentParticipants - a.currentParticipants;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [searchTerm, selectedCategory, selectedCountry, sortBy]);
  
  const handleViewDetails = (event: CuisineEvent) => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('event-detail', event.id);
    }, 500);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCountry('All');
    setSortBy('date');
  };
  
  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedCountry !== 'All' || sortBy !== 'date';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Culinary Experiences
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover hands-on cooking classes, tastings, and culinary adventures 
              led by world-class chefs from around the globe.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <InputField
              placeholder="Search events, cuisines, or chefs..."
              value={searchTerm}
              onChange={setSearchTerm}
              icon={Search}
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {filteredAndSortedEvents.length} events found
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : filteredAndSortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all available events.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={clearFilters}
              >
                Show All Events
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cuisines;