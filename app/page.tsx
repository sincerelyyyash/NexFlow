import React from 'react';
import Link from 'next/link';
import WorkflowBuilder from '@/components/WorkflowBuilder';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        <WorkflowBuilder />
      </main>
    </div>
  );
}
