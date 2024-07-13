import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import PipelineView from './components/PipelineView';
import FilterBar from './components/FilterBar';

const App = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      <TopNavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <FilterBar />
          <div className="flex-1 overflow-auto p-4">
            <PipelineView onStageSelect={setSelectedStage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;