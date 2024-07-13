import React, { useState } from 'react';
import DeployStageDetails from './DeployStageDetails';
import pipelineData from './pipelineDataFailure.json';

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength - 3)}...`;
  }
  return text;
}

const PipelineView = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
  };

  const ExecutionResult = ({ execution }) => {
    const stagesByDependency = {};

    execution.stages.forEach((stage) => {
      const parent = stage.dependsOn ? stage.dependsOn.join(', ') : 'root';
      if (!stagesByDependency[parent]) {
        stagesByDependency[parent] = [];
      }
      stagesByDependency[parent].push(stage);
    });

    const renderStages = (stages, index) => {
      return stages.map((stage, stageIndex) => (
        <g key={stage.id} transform={`translate(${index * 150}, ${stageIndex * 70})`}>
          <circle
            cx="10"
            cy="35"
            r="5"
            fill={stage.status === 'SUCCEEDED' ? 'green' : 'red'}
            className="cursor-pointer"
            onClick={() => handleStageClick(stage)}
          />
          <text
            x="20"
            y="40"
            className="text-sm cursor-pointer"
            onClick={() => handleStageClick(stage)}
          >
            {truncateText(stage.name, 20)}
          </text>
        </g>
      ));
    };

    const renderLines = (stages, index, stagesByDependency) => {
      return stages.flatMap((stage) => {
        return (stage.dependsOn || []).map((dep) => {
          const depIndex = Object.keys(stagesByDependency).findIndex(
            (key) => stagesByDependency[key].some((s) => s.id === dep)
          );
          const x1 = depIndex * 150 + 10;
          const y1 = stagesByDependency[Object.keys(stagesByDependency)[depIndex]].findIndex(
            (s) => s.id === dep
          ) * 70 + 35;
          const x2 = index * 150 + 10;
          const y2 = stages.findIndex((s) => s.id === stage.id) * 70 + 35;

          return (
            <line
              key={`${dep}-${stage.id}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#D3D3D3"
              strokeWidth="1"
            />
          );
        });
      });
    };

    return (
      <div className="bg-white border border-gray-300 rounded-sm mb-4">
        <div className="p-3 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">MANUAL START</h3>
              <p className="text-sm text-gray-600">{execution.startTime}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                Status:{' '}
                <span
                  className={`font-semibold ${
                    execution.status === 'SUCCEEDED' ? 'text-success' : 'text-error'
                  }`}
                >
                  {execution.status}
                </span>
              </p>
              <p className="text-sm">Duration: {execution.duration}</p>
            </div>
          </div>
          <div className="flex mt-2 overflow-x-auto">
            {execution.stages.map((stage, index) => (
              <div
                key={index}
                onClick={() => handleStageClick(stage)}
                className={`flex-child text-xs px-2 py-1 mr-1 whitespace-nowrap ${
                  stage.status === 'SUCCEEDED'
                    ? 'bg-success border-success text-white'
                    : stage.status === 'FAILED'
                    ? 'bg-error border-error text-white'
                    : 'bg-gray-200 border-gray text-gray-700'
                }`}
              >
                {stage.duration}
              </div>
            ))}
          </div>
        </div>
        <div className="p-3">
          <button className="text-accent text-sm mb-2">▼ Details</button>
          <div className="overflow-x-auto" style={{ maxWidth: '100%', overflowY: 'hidden' }}>
            <svg width={Object.keys(stagesByDependency).length * 150} height="200">
              {Object.keys(stagesByDependency).map((dep, index) => {
                return (
                  <g key={dep}>
                    {renderStages(stagesByDependency[dep], index)}
                    {renderLines(stagesByDependency[dep], index, stagesByDependency)}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-blue-50 p-3 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-xl">SPINNAKER-MOCKUPS: {pipelineData.name}</h2>
          </div>
          <div>
            <button className="btn btn-secondary mr-2">Configure</button>
            <button className="btn btn-primary">Start Manual Execution</button>
          </div>
        </div>
      </div>
      {pipelineData.executions.map((execution) => (
        <div key={execution.id}>
          <ExecutionResult key={execution.id} execution={execution} />
          {selectedStage && <DeployStageDetails stageName={selectedStage.name} roles={selectedStage.roles} />}
        </div>
      ))}
    </div>
  );
};

export default PipelineView;
