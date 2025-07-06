import React from 'react';

const GuidelinesAndRules = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Guidelines and Rules</h1>
      
      <div className="space-y-8">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">General Guidelines</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Maintain professional conduct when interacting with agencies</li>
            <li>Provide accurate information in your profile and communications</li>
            <li>Respect intellectual property rights and confidentiality</li>
            <li>Follow the platform's terms of service</li>
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Agency Rules</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Agencies must provide accurate service descriptions and pricing</li>
            <li>Maintain clear communication with clients</li>
            <li>Deliver services as described in the agreement</li>
            <li>Adhere to platform payment and commission policies</li>
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Client Rules</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Clearly communicate project requirements and expectations</li>
            <li>Respect agency policies and working hours</li>
            <li>Follow payment terms and schedules</li>
            <li>Provide constructive feedback through proper channels</li>
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Dispute Resolution</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Attempt to resolve disputes directly through communication</li>
            <li>Use the platform's mediation services when necessary</li>
            <li>Follow the appeal process for unresolved issues</li>
            <li>Maintain professional conduct during dispute resolution</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default GuidelinesAndRules;