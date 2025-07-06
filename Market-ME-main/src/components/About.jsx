import React from 'react';

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">
            Market Me is a dynamic online platform designed to connect new startups with top-tier marketing agencies. 
            Whether you're launching your first product or scaling your business, Market Me helps you build essential 
            industry contacts and find the perfect marketing partners to elevate your brand.
          </p>
          <p className="text-lg">
            Our mission is to simplify the process of discovering, comparing, and connecting with marketing experts 
            who understand your startup's unique needs. From digital marketing and branding to social media and 
            strategy, Market Me empowers emerging businesses to grow faster, smarter, and more effectively.
          </p>
          <p className="text-lg">
            Join Market Me and take the first step toward impactful marketing and long-term success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;