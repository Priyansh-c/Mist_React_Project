import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Form from '../components/ui/Form';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Contact: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const contactFormFields = [
    {
      name: 'name',
      label: 'Full Name',
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
      placeholder: '+91 9999999999'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text' as const,
      required: true,
      placeholder: 'How can we help you?'
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Tell us more about your inquiry...',
      rows: 6
    }
  ];
  
  const handleFormSubmit = async (formData: Record<string, string>) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsFormSubmitted(true);
    
    console.log('Contact form submitted:', formData);
  };
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 999999999',
      subtitle: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@globalcuisines.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: '123 Whitefield',
      subtitle: 'KA 560067'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon-Fri: 9AM-6PM',
      subtitle: 'Sat-Sun: 10AM-4PM'
    }
  ];
  
  const faqs = [
    {
      question: 'How do I book a cooking class?',
      answer: 'You can browse our available classes on the Cuisines page and click "Book Now" on any event that interests you. Follow the booking form to secure your spot.'
    },
    {
      question: 'What should I bring to a cooking class?',
      answer: 'We provide all ingredients, equipment, and aprons. Just bring your enthusiasm and appetite! If you have specific dietary restrictions, please let us know during booking.'
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes, you can cancel or reschedule up to 24 hours before your class for a full refund. Contact us via phone or email to make changes.'
    },
    {
      question: 'Do you offer private group events?',
      answer: 'Absolutely! We offer private cooking classes for groups of 8 or more. Contact us to discuss your requirements and get a custom quote.'
    },
    {
      question: 'Are classes suitable for beginners?',
      answer: 'Yes! Our classes are designed for all skill levels. Our expert chefs provide step-by-step guidance to ensure everyone has a great experience.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our cooking classes or need help with booking? 
              We're here to help you start your culinary journey.
            </p>
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <Form
                fields={contactFormFields}
                onSubmit={handleFormSubmit}
                submitLabel="Send Message"
                loading={isLoading}
              />
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{info.title}</h4>
                      <p className="text-gray-700">{info.details}</p>
                      <p className="text-sm text-gray-500">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">
                Need Immediate Help?
              </h3>
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  fullWidth
                  icon={Phone}
                  className="justify-start"
                >
                  Call Us Now
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={Mail}
                  className="justify-start border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about our cooking classes
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Map Section */}
        <section className="mt-16">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Visit Our Kitchen</h2>
              <p className="text-gray-600 mt-2">
                Located in the heart of Whitefield, our state-of-the-art kitchen 
                is equipped with everything needed for an amazing culinary experience.
              </p>
            </div>
            <div className="h-64 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map would be here</p>
                  <p className="text-sm text-gray-500">Whitefield,KA 560067</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Success Modal */}
      <Modal
        isOpen={isFormSubmitted}
        onClose={() => setIsFormSubmitted(false)}
        title="Message Sent Successfully!"
        size="md"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Thank you for reaching out!
            </h3>
            <p className="text-gray-600">
              We've received your message and will get back to you within 24 hours. 
              Keep an eye on your inbox!
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsFormSubmitted(false)}
          >
            Continue Browsing
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;