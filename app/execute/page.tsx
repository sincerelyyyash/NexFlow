"use client"
import React from 'react';
import WorkflowExecutor from '@/components/WorkflowExecutor';

export default function ExecuteWorkflowPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <WorkflowExecutor />
      </main>
    </div>
  );
}
