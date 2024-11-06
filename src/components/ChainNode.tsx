import React from 'react';
import { Handle, Position } from 'reactflow';

const ChainNode = () => {
  return (
    <div className="node-container">
      <Handle type="source" position={Position.Right} />
      <div className="chain-selector">
        <select defaultValue="">
          <option value="" disabled>Select Chain</option>
          <option value="ethereum">Ethereum</option>
          <option value="binance">Binance</option>
          <option value="polygon">Polygon</option>
        </select>
      </div>
    </div>
  );
};

export default ChainNode; 