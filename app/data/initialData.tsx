import React from 'react';
import { Node, Edge } from 'reactflow';

const FilterNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div className="p-4 bg-black border border-white rounded">
    <div>{data.label}</div>
  </div>
);

const WaitNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div className="p-4 bg-black border border-white rounded">
    <div>{data.label}</div>
  </div>
);

const ConvertFormatNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div className="p-4 bg-black border border-white rounded">
    <div>{data.label}</div>
  </div>
);

const SendPostRequestNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div className="p-4 bg-black border border-white rounded">
    <div>{data.label}</div>
  </div>
);

export const NodeTypes = {
  filter: FilterNode,
  wait: WaitNode,
  convertFormat: ConvertFormatNode,
  sendPostRequest: SendPostRequestNode,
};

export const nodes: Node[] = [
  {
    id: '1',
    type: 'filter',
    data: { label: 'Filter Data' },
    position: { x: 100, y: 0 },
  },
  {
    id: '2',
    type: 'wait',
    data: { label: 'Wait' },
    position: { x: 100, y: 150 },
  },
  {
    id: '3',
    type: 'convertFormat',
    data: { label: 'Convert Format' },
    position: { x: 100, y: 300 },
  },
  {
    id: '4',
    type: 'sendPostRequest',
    data: { label: 'Send POST Request' },
    position: { x: 100, y: 450 },
  }
];

export const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    label: 'Next Step',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    label: 'Next Step',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    animated: true,
    label: 'Next Step',
  }
];
