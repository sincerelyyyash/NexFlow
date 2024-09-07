

"use client";

import React, { useState, useEffect } from "react";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const WorkflowExecutor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [workflowOptions, setWorkflowOptions] = useState<{ _id: string; name: string }[]>([]);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch("/api/get-workflows");
        const data = await response.json();

        if (data.workflowIds.length > 0) {
          const workflowsResponse = await fetch(`/api/get-workflows?ids=${data.workflowIds.join(",")}`);
          const workflowsData = await workflowsResponse.json();
          setWorkflowOptions(workflowsData.workflows);
        } else {
          toast({
            title: "No workflows found.",
            description: "Please add some workflows before trying to execute.",
          });
        }
      } catch (error) {
        console.error("Error fetching workflows:", error);
        toast({
          title: "Failed to fetch workflows.",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    };
    fetchWorkflows();
  }, [toast]);

  const handleFileUpload = (files: File[]) => {
    setFile(files[0]);
  };

  const handleWorkflowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkflowId(e.target.value); // Set workflowId as a string
  };

  const handleSubmit = async () => {
    if (!file || !workflowId) {
      toast({
        title: "Missing information",
        description: "Please select a file and a workflow before submitting.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("workflowId", workflowId); // Use workflowId directly as a string

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Workflow executed successfully!",
          description: result.message || "Your workflow has been processed.",
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

  const buttonClasses = `px-4 py-2 mt-2 rounded ${theme === 'dark'
    ? 'bg-white text-black border hover:bg-gray-200'
    : 'bg-black text-white hover:bg-gray-800'
    }`;

  return (
    <div className="p-4 max-w-md mx-auto">
      <FileUpload onChange={handleFileUpload} />
      <select
        value={workflowId || ''}
        onChange={handleWorkflowChange}
        className="mt-2 block w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select Workflow</option>
        {workflowOptions.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>
      <Button onClick={handleSubmit} className={buttonClasses}>
        Execute Workflow
      </Button>
    </div>
  );
};

export default WorkflowExecutor;

