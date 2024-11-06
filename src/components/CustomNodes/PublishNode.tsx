import React from 'react';
import { Handle, Position } from 'reactflow';

export const PublishNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="node publish-node">
      <Handle type="target" position={Position.Left} />
      <div className="node-content">
        <h3>{data.label}</h3>
        {/* Add publish-specific controls/content here */}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}; 