
"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  Connection,
  addEdge,
  ReactFlowInstance,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

const nodeTypes = {
  filterData: FilterDataNode,
  wait: WaitNode,
  convertFormat: ConvertFormatNode,
  sendPostRequest: SendPostRequestNode,
};

const initialNodes: Node[] = [
  {
    id: "start",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
  },
  {
    id: "end",
    type: "output",
    data: { label: "End" },
    position: { x: 250, y: 300 },
  },
];

export default function WorkflowBuilder() {
  const { data: session } = useSession();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [name, setName] = useState('');

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position: XYPosition = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }) || { x: 0, y: 0 };

      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { label: type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const { toast } = useToast();

  const saveWorkflow = async () => {
    const userId = session?.user?.id;  // Ensure `id` exists on user

    if (!userId) {
      toast({
        title: "Save Error",
        description: "User not authenticated.",
        variant: "destructive",
      });
      return;
    }

    const workflow = { userId, name, nodes, edges };

    try {
      const response = await fetch('/api/workflow/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflow),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "Workflow saved",
          description: `ID: ${result.workflowId}`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Save Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-[600px]">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <div className="flex space-x-2 mt-2">
          <div
            className="border p-2 cursor-move"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "filterData")
            }
            draggable
          >
            Filter Data
          </div>
          <div
            className="border p-2 cursor-move"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "wait")
            }
            draggable
          >
            Wait
          </div>
          <div
            className="border p-2 cursor-move"
            onDragStart={(event) =>
              event.dataTransfer.setData(
                "application/reactflow",
                "convertFormat"
              )
            }
            draggable
          >
            Convert Format
          </div>
          <div
            className="border p-2 cursor-move"
            onDragStart={(event) =>
              event.dataTransfer.setData(
                "application/reactflow",
                "sendPostRequest"
              )
            }
            draggable
          >
            Send POST Request
          </div>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => applyEdgeChanges(changes, eds))
        }
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
      <button
        onClick={saveWorkflow}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Workflow
      </button>
    </div>
  );
}

function FilterDataNode({ data }: { data: { label: string } }) {
  return (
    <div className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white">
      <Handle type="target" position={Position.Top} />
      <p>{data.label}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function WaitNode({ data }: { data: { label: string } }) {
  return (
    <div className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white">
      <Handle type="target" position={Position.Top} />
      <p>{data.label}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function ConvertFormatNode({ data }: { data: { label: string } }) {
  return (
    <div className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white">
      <Handle type="target" position={Position.Top} />
      <p>{data.label}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function SendPostRequestNode({ data }: { data: { label: string } }) {
  return (
    <div className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white">
      <Handle type="target" position={Position.Top} />
      <p>{data.label}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

