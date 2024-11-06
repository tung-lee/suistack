import React, { useState } from 'react';
import { FlowToolbar } from './FlowToolbar';

const TopNav= () => {
  const [showWeb3Toolbar, setShowWeb3Toolbar] = useState(false);

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full p-1 flex gap-2 z-50">
      <div 
        className="relative flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer group"
        onMouseEnter={() => setShowWeb3Toolbar(true)}
        onMouseLeave={() => setShowWeb3Toolbar(false)}
      >
        <span className="text-xl">⬡</span>
        <span>Sui</span>
        
        {showWeb3Toolbar && (
          <div className="absolute top-full left-0">
            <div 
              className="mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-2"
            >
              <FlowToolbar />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer">
        <span className="text-xl">🌐</span>
        <span>Web2</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer">
        <span className="text-xl">⋈</span>
        <span>Apps</span>
      </div>
    </div>
  );
};

export default TopNav; 