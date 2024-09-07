
import { useToast } from '@/hooks/use-toast';
import React, { useState, ChangeEvent, useEffect } from 'react';

const WorkflowExecutor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workflowId, setWorkflowId] = useState<string>('');
  const [workflowOptions, setWorkflowOptions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWorkflows = async () => {
      const response = await fetch('/api/workflows');
      const data = await response.json();
      setWorkflowOptions(data.workflowIds);
    };
    fetchWorkflows();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleWorkflowChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setWorkflowId(e.target.value);
  };

  const handleSubmit = async () => {
    if (!file || !workflowId) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workflowId', workflowId);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Workflow executed successfully!",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Execution failed.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <select value={workflowId} onChange={handleWorkflowChange} className="mt-2">
        <option value="">Select Workflow</option>
        {workflowOptions.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Execute Workflow
      </button>
    </div>
  );
};

export default WorkflowExecutor;

