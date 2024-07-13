import React from 'react';

const TopNavBar = () => {
  return (
    <nav className="bg-slate-700 text-white p-2 flex items-center">
      <button className="mr-4 text-xl">☰</button>
      <span className="font-bold text-xl mr-6">SPINNAKER</span>
      <a href="#" className="mx-3 text-sm">Search</a>
      <a href="#" className="mx-3 text-sm">Projects</a>
      <a href="#" className="mx-3 text-sm">Applications</a>
      <a href="#" className="mx-3 text-sm">Pipeline Templates</a>
      <div className="flex-grow"></div>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search" 
          className="px-3 py-1 pr-8 rounded text-black text-sm w-64"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;