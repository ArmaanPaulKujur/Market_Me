import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const bookingData = location.state || {
    agencyName: 'Sample Agency',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    hourlyRate: 1000,
    totalDays: 31,
    totalHours: 248,
    totalAmount: 248000
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8 mt-8">
        <div className="text-center mb-8">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-gray-300 text-lg">
            Thank you for your booking. The agency will contact you via the provided contact information within 3 business days.
          </p>
        </div>

        {/* Bill Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Booking Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-300">
              <span>Agency</span>
              <span className="font-medium text-white">{bookingData.agencyName}</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Duration</span>
              <span className="font-medium text-white">
                {new Date(bookingData.startDate).toLocaleDateString()} - {new Date(bookingData.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Total Days</span>
              <span className="font-medium text-white">{bookingData.totalDays} days</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Working Hours</span>
              <span className="font-medium text-white">{bookingData.totalHours} hours</span>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Hourly Rate</span>
              <span className="font-medium text-white">₹{bookingData.hourlyRate.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-white">Total Amount</span>
                <span className="font-bold text-blue-500">₹{bookingData.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <Link
            to="/agencies"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Browse More Agencies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
