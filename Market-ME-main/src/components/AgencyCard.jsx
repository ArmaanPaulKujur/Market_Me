import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgencyCard = ({ agency }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src={agency.image || 'https://via.placeholder.com/400x200'}
          alt={agency.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm">
          {agency.rating} ★
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{agency.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{agency.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {agency.services.map((service, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            <span className="text-blue-500 font-semibold">₹{agency.hourlyRate.toLocaleString('en-IN')}</span> /hour
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            onClick={() => navigate(`/agency/${agency.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencyCard;