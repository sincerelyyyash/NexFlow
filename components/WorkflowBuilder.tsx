"use client"
import React from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background, useEdgesState, useNodesState, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeTypes, nodes as initialNodes, edges as initialEdges } from '../app/data/initialData';

const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Edge<any> | any) => setEdges((eds) => addEdge(params, eds));
  const saveWorkflow = async () => {
    const response = await fetch('/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });
    if (response.ok) {
      alert('Workflow saved successfully!');
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-end p-4">
        <button onClick={saveWorkflow} className="bg-blue-500 text-white px-4 py-2 rounded">Save Workflow</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={NodeTypes}
        className="w-full h-full"
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowBuilder;
