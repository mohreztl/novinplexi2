import React from 'react';

const TrustBadges = () => {
  return (
    <div className="flex space-x-4">
      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-white text-gray-900 font-bold text-xs p-2 rounded">
          نماد اعتماد الکترونیک
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
        <div className="bg-white text-gray-900 font-bold text-xs p-2 rounded">
          نماد ساماندهی
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
