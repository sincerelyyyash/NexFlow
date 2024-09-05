import React from 'react';
import Link from 'next/link';
import RunWorkflow from '@/components/WorkflowBuilder';

export default function RunWorkflowPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Run Workflow</h1>
        <Link href="/" className="text-white hover:underline ml-4">
          Workflow Builder
        </Link>
      </header>
      <main className="flex-grow p-4">
        <RunWorkflow />
      </main>
    </div>
  );
}
