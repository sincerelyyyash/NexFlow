import React, { useState, useEffect } from 'react';

interface Workflow {
  id: string;
  name: string;
}

export default function RunWorkflow() {
  const [file, setFile] = useState<File | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');

  useEffect(() => {
    // Load saved workflows from localStorage
    const savedWorkflows: Workflow[] = Object.keys(localStorage).map((key) => ({
      id: key,
      name: `Workflow ${key.slice(0, 8)}`,
    }));
    setWorkflows(savedWorkflows);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleWorkflowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkflow(event.target.value);
  };

  const handleRunWorkflow = async () => {
    if (!file || !selectedWorkflow) {
      alert('Please select a file and a workflow');
      return;
    }

    // Here you would typically send the file and workflow ID to your backend
    // For this example, we'll just simulate the process
    console.log(`Running workflow ${selectedWorkflow} on file ${file.name}`);
    alert(`Workflow ${selectedWorkflow} executed on ${file.name}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
          Upload File
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="workflow-select" className="block text-sm font-medium text-gray-700">
          Select Workflow
        </label>
        <select
          id="workflow-select"
          value={selectedWorkflow}
          onChange={handleWorkflowChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select a workflow</option>
          {workflows.map((workflow) => (
            <option key={workflow.id} value={workflow.id}>
              {workflow.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleRunWorkflow}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!file || !selectedWorkflow}
      >
        Run Workflow
      </button>
    </div>
  );
}
