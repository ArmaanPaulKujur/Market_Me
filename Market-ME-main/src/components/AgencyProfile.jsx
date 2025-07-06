import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './AuthModals';

// Notification Component
const Notification = ({ message, onClose }) => (
  <div className="absolute -top-14 left-0 right-0 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-center animate-fade-in">
    <span>{message}</span>
  </div>
);

// Sample data with extended details
const sampleAgenciesData = [
  {
    id: 1,
    name: 'Digital Growth Experts',
    description: 'Full-service digital marketing agency specializing in growth strategies and brand development.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    rating: 4.8,
    hourlyRate: 950,
    email: 'contact@digitalgrowthexperts.com',
    services: ['SEO', 'Social Media', 'Content Marketing'],
    portfolio: [
      {
        title: 'E-commerce Growth Campaign',
        description: 'Increased online sales by 300% through targeted digital marketing',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
      },
      {
        title: 'Brand Transformation',
        description: 'Complete digital presence overhaul for a leading retailer',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0'
      }
    ],
    team: [
      {
        name: 'John Smith',
        role: 'CEO',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
        expertise: ['Strategic Planning', 'Team Leadership']
      },
      {
        name: 'Sarah Johnson',
        role: 'Marketing Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        expertise: ['Digital Marketing', 'Content Strategy']
      }
    ],
    achievements: ['500+ Successful Projects', '200% Average ROI']
  },
  {
    id: 2,
    name: 'Creative Solutions Hub',
    description: 'Award-winning creative agency focused on innovative marketing campaigns and brand identity.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    rating: 4.9,
    hourlyRate: 1800,
    email: 'hello@creativesolutionshub.com',
    services: ['Branding', 'Web Design', 'Marketing Strategy'],
    portfolio: [
      {
        title: 'Award-winning Website Design',
        description: 'Modern, responsive website with exceptional user experience',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978'
      }
    ],
    team: [
      {
        name: 'Michael Brown',
        role: 'Creative Director',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        expertise: ['Brand Design', 'UX/UI']
      }
    ],
    achievements: ['Award-winning Campaigns', 'Industry Recognition']
  },
  {
    id: 3,
    name: 'Performance Marketing Pro',
    description: 'Data-driven marketing agency specializing in performance marketing and conversion optimization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    rating: 4.7,
    hourlyRate: 1500,
    email: 'info@performancemarketing.pro',
    services: ['PPC', 'Analytics', 'Conversion Optimization'],
    portfolio: [
      {
        title: 'Performance Marketing Success',
        description: 'Achieved 250% ROAS for SaaS client',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
      }
    ],
    team: [
      {
        name: 'Emily Davis',
        role: 'Analytics Lead',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
        expertise: ['Data Analysis', 'Performance Marketing']
      }
    ],
    achievements: ['Data-driven Success']
  },
  {
    id: 4,
    name: 'Social Media Masters',
    description: 'Specialized agency focused on social media strategy, content creation, and community management.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3',
    rating: 4.9,
    hourlyRate: 800,
    email: 'hello@socialmediamasters.com',
    services: ['Social Media', 'Content Creation', 'Influencer Marketing'],
    portfolio: [
      {
        title: 'Viral Social Campaign',
        description: 'Created viral social media campaign reaching millions',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'
      }
    ],
    team: [
      {
        name: 'Alex Turner',
        role: 'Social Media Director',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        expertise: ['Social Media Strategy', 'Content Creation']
      }
    ],
    achievements: ['1M+ Social Reach', 'Top Social Media Agency 2023']
  },
  {
    id: 5,
    name: 'E-commerce Growth Lab',
    description: 'E-commerce focused agency helping businesses scale their online presence and sales.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3',
    rating: 4.8,
    hourlyRate: 1900,
    email: 'contact@ecommercegrowthlab.com',
    services: ['E-commerce', 'PPC', 'Email Marketing'],
    portfolio: [
      {
        title: 'E-commerce Success Story',
        description: '400% increase in online sales for retail client',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'
      }
    ],
    team: [
      {
        name: 'Lisa Chen',
        role: 'E-commerce Strategist',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5',
        expertise: ['E-commerce Strategy', 'Digital Marketing']
      }
    ],
    achievements: ['400% Revenue Growth', 'E-commerce Excellence Award']
  },
  {
    id: 6,
    name: 'Video Marketing Experts',
    description: 'Creative agency specializing in video content, animation, and visual storytelling.',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?ixlib=rb-4.0.3',
    rating: 4.7,
    hourlyRate: 2000,
    email: 'hello@videomarketingexperts.com',
    services: ['Video Production', 'Animation', 'Content Marketing'],
    portfolio: [
      {
        title: 'Brand Story Video',
        description: 'Award-winning brand story video with 2M+ views',
        image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660'
      }
    ],
    team: [
      {
        name: 'David Kim',
        role: 'Creative Director',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        expertise: ['Video Production', 'Creative Direction']
      }
    ],
    achievements: ['Multiple Video Awards', '10M+ Total Views']
  },
  {
    id: 7,
    name: 'Enterprise Solutions Agency',
    description: 'Premium agency specializing in enterprise-level digital transformation and marketing solutions.',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3',
    rating: 4.9,
    hourlyRate: 4800,
    email: 'contact@enterprisesolutions.agency',
    services: ['Digital Transformation', 'Enterprise Solutions', 'Marketing Strategy'],
    portfolio: [
      {
        title: 'Global Enterprise Transformation',
        description: 'Complete digital transformation for Fortune 500 company',
        image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d'
      },
      {
        title: 'Enterprise Marketing Strategy',
        description: 'Comprehensive marketing strategy leading to 400% ROI',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd'
      }
    ],
    team: [
      {
        name: 'Robert Wilson',
        role: 'Managing Director',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
        expertise: ['Enterprise Strategy', 'Digital Transformation']
      },
      {
        name: 'Jennifer Lee',
        role: 'Strategy Director',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
        expertise: ['Marketing Strategy', 'Enterprise Solutions']
      }
    ],
    achievements: ['Fortune 500 Clients', '400% Average ROI', 'Digital Excellence Award']
  },
  {
    id: 8,
    name: 'Global Brand Architects',
    description: 'International branding agency with expertise in global market penetration and brand scaling.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3',
    rating: 4.9,
    hourlyRate: 4500,
    email: 'hello@globalbrandarchitects.com',
    services: ['Global Branding', 'Market Research', 'Strategy Consulting'],
    portfolio: [
      {
        title: 'Global Brand Launch',
        description: 'Successful launch in 20+ countries with unified brand strategy',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd'
      }
    ],
    team: [
      {
        name: 'Sophie Anderson',
        role: 'Global Brand Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        expertise: ['Global Branding', 'Market Strategy']
      }
    ],
    achievements: ['20+ Global Markets', 'International Brand Awards']
  },
  {
    id: 9,
    name: 'Tech Marketing Elite',
    description: 'Specialized in high-tech marketing solutions for SaaS and technology companies.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3',
    rating: 4.8,
    hourlyRate: 4200,
    email: 'contact@techmarketingelite.com',
    services: ['Tech Marketing', 'SaaS Marketing', 'Product Launch'],
    portfolio: [
      {
        title: 'SaaS Product Launch',
        description: '10x user growth for enterprise SaaS platform',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
      }
    ],
    team: [
      {
        name: 'Mark Thompson',
        role: 'Tech Marketing Director',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        expertise: ['SaaS Marketing', 'Product Strategy']
      }
    ],
    achievements: ['10x Client Growth', 'Tech Excellence Award']
  },
  {
    id: 10,
    name: 'Luxury Brand Studio',
    description: 'Premium marketing agency focused on luxury brands and high-end market segments.',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3',
    rating: 4.9,
    hourlyRate: 4900,
    email: 'elite@luxurybrandstudio.com',
    services: ['Luxury Marketing', 'Premium Branding', 'VIP Services'],
    portfolio: [
      {
        title: 'Luxury Brand Transformation',
        description: 'Complete luxury brand overhaul and market positioning',
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623'
      }
    ],
    team: [
      {
        name: 'Victoria Palmer',
        role: 'Luxury Brand Director',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
        expertise: ['Luxury Marketing', 'Brand Strategy']
      }
    ],
    achievements: ['Luxury Brand Awards', 'Premium Client Portfolio']
  },
  {
    id: 11,
    name: 'Data Intelligence Partners',
    description: 'Advanced analytics and AI-driven marketing solutions for enterprise clients.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
    rating: 4.8,
    hourlyRate: 4300,
    email: 'info@dataintelligence.partners',
    services: ['AI Marketing', 'Big Data Analytics', 'Predictive Marketing'],
    portfolio: [
      {
        title: 'AI-Driven Marketing Campaign',
        description: '200% ROI through predictive analytics implementation',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
      }
    ],
    team: [
      {
        name: 'Dr. Alan Chen',
        role: 'Data Science Director',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        expertise: ['AI/ML', 'Data Analytics']
      }
    ],
    achievements: ['200% ROI', 'AI Innovation Award']
  },
  {
    id: 12,
    name: 'Strategic Growth Consultants',
    description: 'Elite consulting firm specializing in strategic marketing and business growth.',
    image: 'https://images.unsplash.com/photo-1553028826-f4545c8e8d44?ixlib=rb-4.0.3',
    rating: 4.9,
    hourlyRate: 4700,
    email: 'contact@strategicgrowth.consulting',
    services: ['Strategy Consulting', 'Growth Marketing', 'Market Analysis'],
    portfolio: [
      {
        title: 'Strategic Growth Implementation',
        description: '300% growth for enterprise client in 12 months',
        image: 'https://images.unsplash.com/photo-1553028826-f4545c8e8d44'
      }
    ],
    team: [
      {
        name: 'James Morrison',
        role: 'Strategy Director',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        expertise: ['Strategic Planning', 'Growth Strategy']
      }
    ],
    achievements: ['300% Client Growth', 'Strategy Excellence Award']
  },
  {
    id: 13,
    name: 'Innovation Marketing Lab',
    description: 'Cutting-edge agency focused on innovative marketing technologies and solutions.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3',
    rating: 4.8,
    hourlyRate: 4100,
    email: 'hello@innovationmarketing.lab',
    services: ['Innovation Strategy', 'Marketing Technology', 'Digital Innovation'],
    portfolio: [
      {
        title: 'Innovation Strategy Implementation',
        description: 'Revolutionary marketing tech solution for enterprise client',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd'
      }
    ],
    team: [
      {
        name: 'Rachel Torres',
        role: 'Innovation Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        expertise: ['Innovation Strategy', 'Marketing Tech']
      }
    ],
    achievements: ['Innovation Awards', 'Tech Pioneer Recognition']
  },
  {
    id: 14,
    name: 'Global Digital Ventures',
    description: 'International digital agency specializing in global market expansion and digital presence.',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3',
    rating: 4.9,
    hourlyRate: 4600,
    email: 'contact@globaldigital.ventures',
    services: ['Global Marketing', 'Digital Strategy', 'Market Expansion'],
    portfolio: [
      {
        title: 'Global Digital Expansion',
        description: 'Successful market entry in 15+ countries',
        image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d'
      }
    ],
    team: [
      {
        name: 'Daniel Garcia',
        role: 'Global Strategy Director',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        expertise: ['Global Strategy', 'Digital Marketing']
      }
    ],
    achievements: ['15+ Market Entries', 'Global Excellence Award']
  },
  {
    id: 15,
    name: 'Premium Content Studio',
    description: 'High-end content creation and strategy agency for premium brands.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3',
    rating: 4.8,
    hourlyRate: 3900,
    email: 'studio@premiumcontent.co',
    services: ['Premium Content', 'Brand Storytelling', 'Content Strategy'],
    portfolio: [
      {
        title: 'Premium Content Strategy',
        description: 'Award-winning content campaign for luxury brand',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0'
      }
    ],
    team: [
      {
        name: 'Emma White',
        role: 'Content Director',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5',
        expertise: ['Content Strategy', 'Brand Storytelling']
      }
    ],
    achievements: ['Content Excellence Award', 'Premium Portfolio']
  },
  {
    id: 16,
    name: 'Enterprise Tech Marketing',
    description: 'Specialized in enterprise technology marketing and digital transformation.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3',
    rating: 4.9,
    hourlyRate: 4400,
    email: 'hello@enterprisetech.marketing',
    services: ['Enterprise Marketing', 'Tech Solutions', 'Digital Transformation'],
    portfolio: [
      {
        title: 'Enterprise Tech Transformation',
        description: 'Complete digital overhaul for enterprise client',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
      }
    ],
    team: [
      {
        name: 'Michael Chang',
        role: 'Enterprise Solutions Director',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        expertise: ['Enterprise Tech', 'Digital Strategy']
      }
    ],
    achievements: ['Enterprise Excellence Award', 'Digital Transformation Leader']
  }
];

const AgencyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const agency = sampleAgenciesData.find(a => a.id === parseInt(id));

  const handleBookService = () => {
    if (user) {
      navigate(`/contact/${id}`);
    } else {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setShowLogin(true);
      }, 2000);
    }
  };

  if (!agency) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Agency not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 rounded-xl z-10"></div>
          <img
            src={agency.image}
            alt={agency.name}
            className="w-full h-[500px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 m-4 rounded-full text-lg z-20 shadow-lg">
            {agency.rating} ★
          </div>
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">{agency.name}</h1>
            <p className="text-xl text-gray-200 max-w-2xl drop-shadow-lg">{agency.description}</p>
          </div>
        </div>

        {/* Agency Info */}
        <div className="bg-gray-800 rounded-xl p-8 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{agency.name}</h1>
          <p className="text-gray-300 text-lg mb-6">{agency.description}</p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-wrap gap-3">
              {agency.services.map((service, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
            <div className="relative">
              {showNotification && (
                <Notification
                  message="Please login first to book services"
                  onClose={() => setShowNotification(false)}
                />
              )}
              <button
                onClick={handleBookService}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300 shadow-lg"
              >
                Book Service
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-gray-300 text-xl">
              <span className="text-blue-500 font-bold">₹{agency.hourlyRate.toLocaleString('en-IN')}</span> /hour
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300"
              onClick={() => window.location.href = `mailto:${agency.email}?subject=Consultation Request for ${agency.name}`}
            >
              Contact Agency Via Email
            </button>
          </div>
        </div>

        {/* Portfolio Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agency.portfolio.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-blue-500/20"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {agency.team.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-xl p-6 flex items-center gap-6 shadow-xl transition-all duration-300 hover:shadow-blue-500/20"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500/20"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agency.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl text-center"
              >
                <span className="text-blue-400 text-lg font-semibold">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default AgencyProfile;