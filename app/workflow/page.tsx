"use client"
import React from 'react';
import WorkflowBuilder from '@/components/WorkflowBuilder';

export default function BuildWorkflowPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <WorkflowBuilder />
      </main>
    </div>
  );
}
