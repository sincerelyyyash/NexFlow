import React from 'react';
import Link from 'next/link';
import WorkflowBuilder from '@/components/WorkflowBuilder';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Workflow Builder</h1>
        <Link href="/run-workflow" className="text-white hover:underline ml-4">
          Run Workflow
        </Link>
      </header>
      <main className="flex-grow p-4">
        <WorkflowBuilder />
      </main>
    </div>
  );
}
