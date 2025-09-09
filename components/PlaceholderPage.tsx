import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="max-w-screen-lg mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <p className="mt-4 text-lg text-gray-600">
        This is a placeholder page. Full functionality for this section is not yet implemented in the demo.
      </p>
    </div>
  );
};