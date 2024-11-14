import React from 'react'
import { Handle, Position } from 'reactflow'
import { Button } from '../../ui/button'

const AfterMathNode = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px]">
        <Handle type="target" position={Position.Left} />
      <h3 className="text-lg font-semibold mb-4 text-center">Aftermath</h3>
      
      {/* <button className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md mb-3 text-left">
        Swap
      </button> */}
      <div className="space-y-3">
        <input 
          type="text"
          placeholder="Type token in:"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        
        <input 
          type="text"
          placeholder="Type token out:"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <Button className="w-full mt-3">Swap</Button>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default AfterMathNode
