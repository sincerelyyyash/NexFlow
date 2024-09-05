
import { useToast } from '@/hooks/use-toast';
import React, { useState, ChangeEvent } from 'react';

const WorkflowExecutor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workflowId, setWorkflowId] = useState<string>('');
  const { toast } = useToast();

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

    const response = await fetch('/api/execute', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      toast({
        title: "Workflow executed successfully!",
      })
    } else {
      alert('Execution failed.');
      toast({
        title: "Execution failed.",
        variant: "destructive"
      })

    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <select onChange={handleWorkflowChange} className="mt-2">
        <option value="">Select Workflow</option>
      </select>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Execute Workflow</button>
    </div>
  );
};

export default WorkflowExecutor;
