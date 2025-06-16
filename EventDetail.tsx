import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChefHat, 
  Star, 
  Heart,
  Share2,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Form from '../components/ui/Form';
import { cuisineEvents, CuisineEvent } from '../data/cuisines';

interface EventDetailProps {
  eventId: string;
  onNavigate: (page: string) => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ eventId, onNavigate }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const event = cuisineEvents.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <Button onClick={() => onNavigate('cuisines')}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Workshop': return 'bg-blue-100 text-blue-800';
      case 'Tasting': return 'bg-purple-100 text-purple-800';
      case 'Festival': return 'bg-orange-100 text-orange-800';
      case 'Masterclass': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const availableSpots = event.maxParticipants - event.currentParticipants;
  const isAlmostFull = availableSpots <= 3;
  const isSoldOut = availableSpots === 0;
  
  const bookingFormFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text' as const,
      required: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text' as const,
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      required: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel' as const,
      required: true
    },
    {
      name: 'dietaryRestrictions',
      label: 'Dietary Restrictions',
      type: 'textarea' as const,
      placeholder: 'Please list any allergies or dietary restrictions...',
      rows: 3
    },
    {
      name: 'specialRequests',
      label: 'Special Requests',
      type: 'textarea' as const,
      placeholder: 'Any special requests or comments...',
      rows: 3
    }
  ];
  
  const handleBooking = async (formData: Record<string, string>) => {
    setIsBookingLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsBookingLoading(false);
    setIsBookingModalOpen(false);
    setIsBookingSuccess(true);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => onNavigate('cuisines')}
            className="border-none"
          >
            Back to Events
          </Button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative">
              <img 
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={isFavorited ? Heart : Heart}
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`!p-2 bg-white bg-opacity-90 backdrop-blur-sm border-none ${
                    isFavorited ? 'text-red-500' : 'text-gray-600'
                  }`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={Share2}
                  onClick={handleShare}
                  className="!p-2 bg-white bg-opacity-90 backdrop-blur-sm border-none text-gray-600"
                />
              </div>
            </div>
            
            {/* Event Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-amber-500" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-amber-500" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-amber-500" />
                  {event.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <ChefHat className="h-5 w-5 mr-3 text-amber-500" />
                  {event.chef}
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{event.longDescription}</p>
              </div>
            </div>
            
            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chef Profile */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet Your Chef</h2>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChefHat className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{event.chef}</h3>
                  <p className="text-gray-600 mb-2">Master Chef • {event.country}</p>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.9/5 • 127 reviews)</span>
                  </div>
                  <p className="text-gray-700">
                    Renowned for authentic {event.cuisine} cuisine with over 15 years of experience 
                    in traditional cooking methods and modern culinary innovations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${event.price}
                  <span className="text-base font-normal text-gray-600"> per person</span>
                </div>
                
                {isAlmostFull && !isSoldOut && (
                  <div className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block">
                    Only {availableSpots} spots left!
                  </div>
                )}
                
                {isSoldOut && (
                  <div className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full inline-block">
                    Sold Out
                  </div>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available spots:</span>
                  <span className="font-medium">{availableSpots} / {event.maxParticipants}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSoldOut}
                onClick={() => setIsBookingModalOpen(true)}
                className="mb-4"
              >
                {isSoldOut ? 'Sold Out' : 'Book Now'}
              </Button>
              
              <div className="text-xs text-gray-500 text-center">
                Free cancellation up to 24 hours before the event
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Book Your Culinary Experience"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">{event.title}</h4>
            <div className="text-sm text-amber-700 space-y-1">
              <div>{formatDate(event.date)}</div>
              <div>{event.location}</div>
              <div className="font-medium">${event.price} per person</div>
            </div>
          </div>
          
          <Form
            fields={bookingFormFields}
            onSubmit={handleBooking}
            submitLabel="Complete Booking"
            loading={isBookingLoading}
          />
        </div>
      </Modal>
      
      {/* Success Modal */}
      <Modal
        isOpen={isBookingSuccess}
        onClose={() => setIsBookingSuccess(false)}
        title="Booking Confirmed!"
        size="md"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              You're all set!
            </h3>
            <p className="text-gray-600">
              We've sent a confirmation email with all the details. 
              We can't wait to see you at the event!
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setIsBookingSuccess(false);
              onNavigate('cuisines');
            }}
          >
            Browse More Events
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EventDetail;