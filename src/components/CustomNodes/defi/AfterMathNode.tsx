import React from 'react'
import { Handle, Position, useNodeId, useNodes } from 'reactflow'
import { Button } from '../../ui/button'
import { useFlow } from '../../../contexts/FlowContext';

const AfterMathNode = () => {
  const [loading, setLoading] = React.useState(false);
    const {addSuccessNode}=useFlow();
    const nodeId=useNodeId();
    const nodeList = useNodes()
  const handleSwap = () => {
    setLoading(true);
    
    setTimeout(() => {
      console.log("Swap action executed");
      setLoading(false);
      const sourceNode=nodeList.find((node)=>node.id===nodeId); 

      const newNode={
        id: `success-${Date.now()}`,
        type: "success",
        position:{
            x:(sourceNode?.position.x??0)+500,
            y:sourceNode?.position.y??0
        },
        data:{
            url:null
        }
      }
      addSuccessNode(newNode,nodeId!);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px]">
        <Handle type="target" position={Position.Left} />
        <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/aftermath.png" alt="logo" className="w-10 h-10 rounded-full" />
            <h3 className="text-lg font-semibold">Aftermath</h3>
        </div>
      
      {/* <button className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md mb-3 text-left">
        Swap
      </button> */}
      <div className="space-y-3">
        <input 
          type="text"
          placeholder="Type token in:"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        />
        
        <input 
          type="text"
          placeholder="Type token out:"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
        />
      </div>
      <Button 
        className="w-full mt-3" 
        onClick={handleSwap}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Swap'}
      </Button>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default AfterMathNode
