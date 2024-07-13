import React from 'react';

const FilterBar = () => {
  return (
    <div className="bg-gray-100 p-2 flex items-center justify-between">
      <div className="flex items-center">
        <button className="bg-gray-300 px-2 py-1 rounded mr-2">Filters</button>
        <button className="border border-gray-400 px-1 rounded mr-1">+</button>
        <button className="border border-gray-400 px-1 rounded mr-2">-</button>
        <span className="mr-2">Group by</span>
        <select className="border rounded px-1 mr-2">
          <option>Pipeline</option>
        </select>
        <span className="mr-2">Show</span>
        <select className="border rounded px-1 mr-2">
          <option>2</option>
        </select>
        <span className="mr-2">executions per pipeline</span>
        <input type="checkbox" id="stageDurations" className="mr-1" />
        <label htmlFor="stageDurations">stage durations</label>
      </div>
      <div>
        <button className="bg-gray-300 px-2 py-1 rounded mr-2">Create</button>
        <button className="bg-gray-300 px-2 py-1 rounded mr-2">Configure</button>
        <button className="bg-accent text-white px-2 py-1 rounded">Start Manual Execution</button>
      </div>
    </div>
  );
};

export default FilterBar;