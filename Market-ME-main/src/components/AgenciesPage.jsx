import React, { useState } from 'react';
import AgencyCard from './AgencyCard';

// Sample data - replace with actual API data later
const sampleAgencies = [
  {
    id: 1,
    name: 'Digital Growth Experts',
    description: 'Full-service digital marketing agency specializing in growth strategies and brand development.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    rating: 4.8,
    services: ['SEO', 'Social Media', 'Content Marketing'],
    hourlyRate: 950
  },
  {
    id: 2,
    name: 'Creative Solutions Hub',
    description: 'Award-winning creative agency focused on innovative marketing campaigns and brand identity.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    rating: 4.9,
    services: ['Branding', 'Web Design', 'Marketing Strategy'],
    hourlyRate: 1800
  },
  {
    id: 3,
    name: 'Performance Marketing Pro',
    description: 'Data-driven marketing agency specializing in performance marketing and conversion optimization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    rating: 4.7,
    services: ['PPC', 'Analytics', 'Conversion Optimization'],
    hourlyRate: 1500
  },
  {
    id: 4,
    name: 'Social Media Masters',
    description: 'Specialized agency focused on social media strategy, content creation, and community management.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
    rating: 4.9,
    services: ['Social Media', 'Content Creation', 'Influencer Marketing'],
    hourlyRate: 800
  },
  {
    id: 5,
    name: 'E-commerce Growth Lab',
    description: 'E-commerce focused agency helping businesses scale their online presence and sales.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    rating: 4.8,
    services: ['E-commerce', 'PPC', 'Email Marketing'],
    hourlyRate: 1900
  },
  {
    id: 6,
    name: 'Video Marketing Experts',
    description: 'Creative agency specializing in video content, animation, and visual storytelling.',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660',
    rating: 4.7,
    services: ['Video Production', 'Animation', 'Content Marketing'],
    hourlyRate: 2000
  },
  {
    id: 7,
    name: 'Enterprise Solutions Agency',
    description: 'Premium agency specializing in enterprise-level digital transformation and marketing solutions.',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d',
    rating: 4.9,
    services: ['Digital Transformation', 'Enterprise Solutions', 'Marketing Strategy'],
    hourlyRate: 4800
  },
  {
    id: 8,
    name: 'Global Brand Architects',
    description: 'International branding agency with expertise in global market penetration and brand scaling.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
    rating: 4.9,
    services: ['Global Branding', 'Market Research', 'Strategy Consulting'],
    hourlyRate: 4500
  },
  {
    id: 9,
    name: 'Tech Marketing Elite',
    description: 'Specialized in high-tech marketing solutions for SaaS and technology companies.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
    rating: 4.8,
    services: ['Tech Marketing', 'SaaS Marketing', 'Product Launch'],
    hourlyRate: 4200
  },
  {
    id: 10,
    name: 'Luxury Brand Studio',
    description: 'Premium marketing agency focused on luxury brands and high-end market segments.',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623',
    rating: 4.9,
    services: ['Luxury Marketing', 'Premium Branding', 'VIP Services'],
    hourlyRate: 4900
  },
  {
    id: 11,
    name: 'Data Intelligence Partners',
    description: 'Advanced analytics and AI-driven marketing solutions for enterprise clients.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    rating: 4.8,
    services: ['AI Marketing', 'Big Data Analytics', 'Predictive Marketing'],
    hourlyRate: 4300
  },
  {
    id: 12,
    name: 'Strategic Growth Consultants',
    description: 'Elite consulting firm specializing in strategic marketing and business growth.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093',
    rating: 4.9,
    services: ['Strategy Consulting', 'Growth Marketing', 'Market Analysis'],
    hourlyRate: 4700
  },
  {
    id: 13,
    name: 'Innovation Marketing Lab',
    description: 'Cutting-edge agency focused on innovative marketing technologies and solutions.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
    rating: 4.8,
    services: ['Innovation Strategy', 'Marketing Technology', 'Digital Innovation'],
    hourlyRate: 4100
  },
  {
    id: 14,
    name: 'Global Digital Ventures',
    description: 'International digital agency specializing in global market expansion and digital presence.',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d',
    rating: 4.9,
    services: ['Global Marketing', 'Digital Strategy', 'Market Expansion'],
    hourlyRate: 4600
  },
  {
    id: 15,
    name: 'Premium Content Studio',
    description: 'High-end content creation and strategy agency for premium brands.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    rating: 4.8,
    services: ['Premium Content', 'Brand Storytelling', 'Content Strategy'],
    hourlyRate: 3900
  },
  {
    id: 16,
    name: 'Enterprise Tech Marketing',
    description: 'Specialized in enterprise technology marketing and digital transformation.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
    rating: 4.9,
    services: ['Enterprise Marketing', 'Tech Solutions', 'Digital Transformation'],
    hourlyRate: 4400
  }
];

const AgenciesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('All');

  const services = ['All', 'SEO', 'Social Media', 'Content Marketing', 'Branding', 'Web Design', 'PPC', 'E-commerce', 'Video Production', 'Animation', 'Email Marketing', 'Influencer Marketing', 'Analytics'];

  const filteredAgencies = sampleAgencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'All' || agency.services.includes(selectedService);
    return matchesSearch && matchesService;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Explore Marketing Agencies</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Find and connect with the perfect marketing agency to help grow your business.</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-2">Search Agencies</label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name or description..."
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute right-3 top-3 text-gray-400">🔍</span>
              </div>
            </div>
            <div className="md:w-64">
              <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">Filter by Service</label>
              <select
                id="service"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-400 mb-6">
          Found {filteredAgencies.length} agencies
        </div>

        {/* Agency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgencies.map(agency => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No agencies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgenciesPage;