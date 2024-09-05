// components/WorkflowSelect.tsx
import React, { useState, useEffect } from 'react';
import { getWorkflows, Workflow } from '@/utils/workflow';

interface WorkflowSelectProps {
  onWorkflowSelect: (id: string) => void;
}

export const WorkflowSelect: React.FC<WorkflowSelectProps> = ({
  onWorkflowSelect,
}) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setIsLoading(true);
        const fetchedWorkflows = await getWorkflows();
        setWorkflows(fetchedWorkflows);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  const handleWorkflowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedWorkflow(selectedId);
    onWorkflowSelect(selectedId);
  };

  return (
    <div className="mb-4">
      <label htmlFor="workflow-select" className="block font-medium mb-2">
        Select a workflow:
      </label>
      <select
        id="workflow-select"
        value={selectedWorkflow}
        onChange={handleWorkflowChange}
        className="w-full bg-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        <option value="">Select a workflow</option>
        {workflows.map((workflow) => (
          <option key={workflow.id} value={workflow.id}>
            {workflow.name}
          </option>
        ))}
      </select>
      {isLoading && <p className="text-sm text-gray-500 mt-2">Loading workflows...</p>}
    </div>
  );
};
