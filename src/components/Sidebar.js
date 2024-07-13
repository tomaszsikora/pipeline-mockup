import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: '📊', label: 'PIPELINES' },
    { icon: '🖧', label: 'CLUSTERS' },
    { icon: '⚖', label: 'LOAD BALANCERS' },
    { icon: '🔒', label: 'FIREWALLS' },
    { icon: '✓', label: 'TASKS' },
    { icon: '⚙', label: 'CONFIG' }
  ];

  return (
    <div className="bg-blue-50 w-48 min-h-screen">
      <div className="bg-blue-100 p-4 flex items-center">
        <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <span>📄</span>
        </div>
        <span className="font-semibold">product-detail</span>
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <div key={index} className="p-4 hover:bg-blue-100 cursor-pointer flex items-center">
            <span className="mr-3 text-gray-600">{item.icon}</span>
            <span className="text-gray-700">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;