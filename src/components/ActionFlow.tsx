import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ActionNode from './ActionNode';
import ChainNode from './ChainNode';
import QueryNode from './QueryNode';
import TopNav from './TopNav';

const nodeTypes = {
  action: ActionNode,
  chain: ChainNode,
  query: QueryNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'chain',
    position: { x: 100, y: 100 },
    data: { label: 'Select Chain' },
  },
  {
    id: '2',
    type: 'action',
    position: { x: 400, y: 100 },
    data: { label: 'Select Action' },
  },
  {
    id: '3',
    type: 'query',
    position: { x: 700, y: 100 },
    data: { label: 'Query Chain' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <>
      <TopNav />
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

const ActionFlow = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

export default ActionFlow; 