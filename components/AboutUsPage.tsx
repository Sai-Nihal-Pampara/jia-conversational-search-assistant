import React from 'react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          About JIA
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Your Conversational Fashion Discovery Platform.
        </p>
      </div>
      <div className="mt-12 prose prose-lg mx-auto text-gray-700">
        <p>
          Welcome to JIA, where fashion meets the future. We believe that finding the perfect outfit should be as easy and natural as having a conversation. Our mission is to revolutionize the e-commerce experience by providing an intuitive, voice-first interface that understands your needs and helps you discover trends and styles effortlessly.
        </p>
        <p>
          JIA is more than just a search bar; it's your personal shopping assistant. Powered by cutting-edge AI, JIA listens to your requests, understands context, and presents you with a curated selection of fashion items tailored just for you. Whether you're looking for "a red dress for a party" or "trendy sneakers for men," JIA makes shopping simple, fast, and fun.
        </p>
        <p>
          Thank you for joining us on this journey. We're excited to help you find your unique style.
        </p>
      </div>
    </div>
  );
};