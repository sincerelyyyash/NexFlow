"use client"
// app/page.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileUpload } from '@/components/FileUpload';
import { WorkflowSelect } from '@/components/WorkflowSelect';
import { runWorkflow } from '@/utils/workflow';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [workflowId, setWorkflowId] = useState<string>('');
  const router = useRouter();

  const handleFileUpload = (newFile: File) => {
    setFile(newFile);
  };

  const handleWorkflowSelect = (id: string) => {
    setWorkflowId(id);
  };

  const handleRunWorkflow = async () => {
    if (file && workflowId) {
      try {
        await runWorkflow(file, workflowId);
        alert('Workflow executed successfully!');
        router.refresh();
      } catch (error) {
        console.error('Error executing workflow:', error);
        alert('Error executing workflow. Please try again.');
      }
    } else {
      alert('Please select a file and a workflow to execute.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Workflow Executor</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <FileUpload onFileUpload={handleFileUpload} />
        <WorkflowSelect onWorkflowSelect={handleWorkflowSelect} />
        <button
          onClick={handleRunWorkflow}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          disabled={!file || !workflowId}
        >
          Run Workflow
        </button>
      </div>
    </div>
  );
}
