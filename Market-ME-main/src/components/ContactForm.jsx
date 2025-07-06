import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Notification = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between">
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
      ×
    </button>
  </div>
);

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    startupName: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/agencies/${id}`);
        if (!response.ok) {
          throw new Error('Agency not found');
        }
        const data = await response.json();
        setAgency(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyData();
  }, [id]);

  const calculateBookingDetails = () => {
    if (!agency) return null;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const totalHours = totalDays * 8;
    const hourlyRate = agency.hourly_rate;
    const totalAmount = totalHours * hourlyRate;

    return {
      agencyName: agency.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalDays,
      totalHours,
      hourlyRate,
      totalAmount
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingDetails = calculateBookingDetails();
    console.log('Form submitted:', { ...formData, agencyId: id, bookingDetails });
    navigate('/confirmation', { state: bookingDetails });
  };

  return (
    <>
      {showNotification && (
        <Notification
          message="Booking confirmed, the agency will contact you soon"
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Book Service</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="startupName" className="block text-sm font-medium text-gray-300">Startup Name</label>
              <input
                type="text"
                id="startupName"
                name="startupName"
                required
                value={formData.startupName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-700 pt-6 mt-6">
              {/* Guidelines and Agreement Section */}
              <div className="bg-gray-700 p-4 rounded-lg space-y-4">
                <h3 className="text-lg font-medium text-white">General Guidelines</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li>Maintain professional conduct when interacting with agencies</li>
                  <li>Provide accurate information in your profile and communications</li>
                  <li>Respect intellectual property rights and confidentiality</li>
                  <li>Follow the platform's terms of service</li>
                </ul>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg space-y-4">
                <h3 className="text-lg font-medium text-white">Client Guidelines</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li>Clearly communicate project requirements and expectations</li>
                  <li>Respect agency policies and working hours</li>
                  <li>Follow payment terms and schedules</li>
                  <li>Provide constructive feedback through proper channels</li>
                </ul>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg space-y-4">
                <h3 className="text-lg font-medium text-white">Agency Guidelines</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li>Agencies must provide accurate service descriptions and pricing</li>
                  <li>Maintain clear communication with clients</li>
                  <li>Deliver services as described in the agreement</li>
                  <li>Adhere to platform payment and commission policies</li>
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the terms and conditions, and I have read and understood the guidelines above
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate(`/agency/${id}`)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
