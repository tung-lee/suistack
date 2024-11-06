import React from 'react';
import { Handle, Position } from 'reactflow';

export const BuildNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="node build-node">
      <Handle type="target" position={Position.Left} />
      <div className="node-content">
        <h3>{data.label}</h3>
        {/* Add build-specific controls/content here */}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}; 