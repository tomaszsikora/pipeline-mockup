import React, { useState } from 'react';

const DeployStageDetails = ({ stageName, roles }) => {
    const [activeTab, setActiveTab] = useState('Status');
    const [selectedStep, setSelectedStep] = useState('Deploy K8s roles');

    var steps = [
        { name: 'Interface API', status: 'SUCCEEDED', started: '00:00', duration: '00:00' },
        { name: 'Pre Deploy Job', status: 'SUCCEEDED', started: '00:00', duration: '00:00' },
        { name: 'Deploy K8s roles', status: 'SUCCEEDED', started: '00:00', duration: '00:00' },
        { name: 'Post Deploy Job', status: 'SUCCEEDED', started: '00:00', duration: '00:00' },
    ];

    function getSyncedRolesCount(roles) {
        return roles.filter(role => role.status === 'Synced').length;
    }

    function getResourceStatusColorClass(status) {
        switch (status) {
            case 'Synced':
                return 'bg-green-600';
            case 'In Progress':
            case 'Pending':
                return 'bg-blue-600';
            case 'Failed':
            case 'Degraded':
                return 'bg-red-600';
            default:
                return '';
        }
    }

    function getResourceIconClass(status) {
        switch (status) {
            case 'Synced':
                return 'icon-green';
            case 'In Progress':
            case 'Pending':
                return 'icon-blue';
            case 'Failed':
            case 'Degraded':
                return 'icon-red';
            default:
                return '';
        }
    }

    function getKindIconClass(kind) {
        switch (kind) {
            case 'Pod':
                return 'icon-pod';
            case 'Service':
                return 'icon-service';
            case 'Deployment':
                return 'icon-deployment';
            default:
                return '';
        }
    }

    function handleCancel() {
        // Logic to cancel the deployment
        console.log('Deployment cancelled');
    }

    function handleRollback() {
        // Logic to rollback the deployment
        console.log('Deployment rolled back');
    }

    if (!stageName.toLowerCase().includes('pod')) {
        steps = [{ name: 'Not Implemented', status: 'SUCCEEDED', started: '00:00', duration: '00:00' }];
        roles = [];
    }

    // Sorting logic for roles and resources
    function sortRoles(roles) {
        return roles.sort((a, b) => {
            if (a.status === 'Failed' || a.status === 'Degraded') return -1;
            if (b.status === 'Failed' || b.status === 'Degraded') return 1;
            return 0;
        });
    }

    function sortResources(resources) {
        return resources.sort((a, b) => {
            if (a.status === 'Degraded') return -1;
            if (b.status === 'Degraded') return 1;
            if (a.status === 'Failed') return -1;
            if (b.status === 'Failed') return 1;
            return 0;
        });
    }

    return (
        <div className="bg-gray-light border rounded p-4 mt-4">
            <div className="flex mb-4">
                <div className="w-12 pr-4 bg-white p-1">
                    <div className="flex justify-between items-center mb-4 border">
                        <h3 className="text-xl font-bold">STAGE DETAILS: {stageName.toUpperCase()}</h3>
                        <p className="">Duration: 00:00</p>
                    </div>
                    <table className="w-full" cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr className="bg-white">
                                <th className="text-left p-2">Step</th>
                                <th className="text-left p-2">Started</th>
                                <th className="text-left p-2">Duration</th>
                                <th className="text-left p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {steps.map((step, index) => (
                                <tr
                                    key={index}
                                    className={`cursor-pointer ${selectedStep === step.name ? 'bg-blue-100' : 'bg-white'}`}
                                    onClick={() => setSelectedStep(step.name)}
                                >
                                    <td className="p-2 text-left">{step.name}</td>
                                    <td className="p-2 text-left">{step.started}</td>
                                    <td className="p-2 text-left">{step.duration}</td>
                                    <td className="p-2 text-left">
                                        <span className="bg-success text-white px-2 py-1 rounded text-sm">{step.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-12 pl-4 bg-blue-100 p-2">
                    <h4 className="font-bold mb-2">{selectedStep}</h4>
                    <div className="flex mb-4">
                        <button
                            className={`mr-2 button button-primary ${activeTab === 'Status' ? 'bg-primary text-white' : 'bg-white text-black'}`}
                            onClick={() => setActiveTab('Status')}
                        >
                            Status
                        </button>
                        <button
                            className={`button button-white ${activeTab === 'Detailed Results' ? 'bg-primary text-white' : 'bg-white text-black'}`}
                            onClick={() => setActiveTab('Detailed Results')}
                        >
                            Detailed Results
                        </button>
                    </div>
                    {selectedStep === 'Deploy K8s roles' ? (
                        <>
                            {activeTab === 'Status' && roles.length > 0 && (
                                <div>
                                    <h4 className="font-bold mb-2">Overall Status</h4>
                                    <p className="text-green-600 font-bold">Succeeded {roles.length}/{roles.length}</p>
                                    <h4 className="font-bold mb-2">Version</h4>
                                    <p className="text-primary font-bold">v138</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="button bg-red-600 text-white px-4 py-2 rounded mr-2"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="button bg-yellow-600 text-white px-4 py-2 rounded"
                                            onClick={handleRollback}
                                        >
                                            Rollback
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'Detailed Results' && (
                                <div>
                                    <h4 className="font-bold mb-2">ArgoCD Sync Status</h4>
                                    <p className="text-green-600 font-bold mb-2">Overall: Synced {getSyncedRolesCount(roles)}/{roles.length}</p>
                                    {sortRoles(roles).map((role, index) => (
                                        <div key={index} className="mb-2 pl-2 resource-container">
                                            <details>
                                                <summary className="resource-summary">
                                                    <span className={`arrow ${role.expanded ? 'expanded' : 'collapsed'}`}></span>
                                                    <span className={`icon ${getResourceIconClass(role.status)}`}></span>
                                                    {role.name}: {role.status} ({role.count})
                                                </summary>
                                                {sortResources(role.resources).map((resource, index) => (
                                                    <p key={index} className="pl-4 mt-1">
                                                        <span className={`icon ${getKindIconClass(resource.kind)}`}></span>
                                                        kind:{resource.kind} name:{resource.name}{' '}
                                                        <span className={`px-2 py-1 rounded text-sm text-white ${getResourceStatusColorClass(resource.status)}`}>
                                                            {resource.status}
                                                        </span>
                                                    </p>
                                                ))}
                                            </details>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div>
                            <h4 className="font-bold mb-2">Not Implemented</h4>
                            <p>Details for this step are not available.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeployStageDetails;
