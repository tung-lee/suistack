import React from 'react';
import { Handle, Position } from 'reactflow';

const actions = [
  { id: 'swap', label: 'Swap' },
  { id: 'scheduleTransfer', label: 'Schedule Transfer' },
  { id: 'remark', label: 'Remark' },
  { id: 'stake', label: 'Stake' },
  { id: 'delegate', label: 'Delegate' },
  { id: 'link', label: 'Link' },
  { id: 'vote', label: 'Vote' },
  { id: 'xTransfer', label: 'xTransfer' },
];

const ActionNode = () => {
  return (
    <div className="node-container">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="action-selector">
        <select defaultValue="">
          <option value="" disabled>Select Action</option>
          {actions.map(action => (
            <option key={action.id} value={action.id}>
              {action.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ActionNode; 