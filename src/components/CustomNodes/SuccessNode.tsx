import React from 'react'
import { Position } from 'reactflow';
import { Handle } from 'reactflow';

interface SuccessNodeProps {
  data:{
    url: string;
}}

const SuccessNode = ({ data }: SuccessNodeProps) => {
  return (
    <div className="p-3 bg-green-100 rounded-md">
        <Handle type="target" position={Position.Left} />
      <p className="text-green-700 font-medium">Completed Transaction!</p>
      <a href={`https://devnet.suivision.xyz/txblock/${data.url}`} target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm">https://devnet.suivision.xyz/txblock/{data.url}</a>
    </div>
  )
}

export default SuccessNode
