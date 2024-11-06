import React from 'react';
import { Handle, Position } from 'reactflow';

export const QueryNode = () => {
  return (
    <div className="node-container query-node">
      <Handle type="target" position={Position.Left} />
      <div className="query-form">
        <h3>Query Chain Form</h3>
        <select defaultValue="">
          <option value="" disabled>Select Chain</option>
          <option value="ethereum">Ethereum</option>
          <option value="binance">Binance</option>
          <option value="polygon">Polygon</option>
        </select>
        <div className="storage-info">
          No selected storage item.
        </div>
      </div>
    </div>
  );
};