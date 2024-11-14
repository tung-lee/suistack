import React, { createContext, useContext, useCallback, useEffect } from 'react';
import {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import { useAppSelector } from '../redux/hooks';
import { useNodes } from '@xyflow/react';

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (params: any) => void;
  addSuccessNode: (nodeNew: Node, nodeId: string) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

const initialNodes: Node[] = [
  // {
  //   id: '2',
  //   type: 'action',
  //   position: { x: 400, y: 100 },
  //   data: { label: 'Select Action' },
  // },
  // {
  //   id: '3',
  //   type: 'query',
  //   position: { x: 700, y: 100 },
  //   data: { label: 'Query Chain' },
  // },
];

const initialEdges: Edge[] = [
  // { id: 'e1-2', source: '1', target: '2', animated: true },
  // { id: 'e2-3', source: '2', target: '3', animated: true },
];

export const FlowProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const {publish,build}=useAppSelector(state=>state.build)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const addSuccessNode=(nodeNew:Node, nodeId:string)=>{
    // console.log(nodeId)
    // console.log(nodeNew)
    const newEdge={id:`e${nodeId}-${nodeNew.id}`,source:nodeId,target:nodeNew.id,type:"custom",markerEnd:{type:MarkerType.Arrow}}
    setNodes((nds)=>[...nds,nodeNew])
    setEdges((eds)=>[...eds,newEdge])
  }
  useEffect(()=>{
    if(publish!==null){
      const sourceNode=nodes.find((node)=>node.id===build.currentBuildNode)
      publish.functions.forEach((func, index) => {
        const functionNode = {
          id: `function-${Date.now()}`,
          type: 'function',
          position: { x: (sourceNode?.position.x??0)+500, y: (sourceNode?.position.y??0)+(index*100) },
          data: func
        };
        
        // Thêm node mới
        setNodes((prevNodes) => [...prevNodes, functionNode]);
        
        // Thêm edge để kết nối với node '2'
        const newEdge = {
          id: `edge-${functionNode.id}`,
          source: build.currentBuildNode, // Node nguồn (build node)
          target: functionNode.id, // Node đích (function node)
          type: 'custom',
          markerEnd: { type: MarkerType.Arrow },
          
        };
        setEdges((eds) => addEdge(newEdge, eds));
      });
    }
  },[publish])
  return (
    <FlowContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addSuccessNode,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};