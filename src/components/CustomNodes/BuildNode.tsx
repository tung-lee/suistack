import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BuildNode = ({ data }: { data: { label: string } }) => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleBuild = async () => {
    try {
      setLoading(true);
      // Mock API call with 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult('Build completed successfully! 🎉');
    } catch (error) {
      console.error('Build failed:', error);
      setResult('Build failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="node build-node">
      <Handle type="target" position={Position.Left} />
      <div className="node-content">
        <h3>{data.label}</h3>
        <button 
          onClick={handleBuild}
          disabled={loading}
          className="build-button"
        >
          {loading ? 'Building...' : 'Start Build'}
        </button>
        {result && (
          <div className="build-result">
            {result}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}; 