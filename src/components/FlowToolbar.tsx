import { ChainIcon, ActionIcon, ChainQueryIcon } from './Icons/icons';

export const FlowToolbar = () => {
  const nodeTypes = [
    { 
      id: 'chain', 
      label: 'Chain', 
      icon: <ChainIcon className="h-6 w-6" fillColor="#6B7280" /> 
    },
    { 
      id: 'chainTx', 
      label: 'Chain TX', 
      icon: <ChainIcon className="h-6 w-6" fillColor="#6B7280" /> 
    },
    { 
      id: 'chainQuery', 
      label: 'Chain Query', 
      icon: <ChainQueryIcon className="h-6 w-6" fillColor="#6B7280" /> 
    },
    { 
      id: 'action', 
      label: 'Action', 
      icon: <ActionIcon className="h-6 w-6" fillColor="#6B7280" /> 
    },
    { 
      id: 'lightClient', 
      label: 'Light Client', 
      icon: <ChainIcon className="h-6 w-6" fillColor="#6B7280" /> 
    },
    { 
      id: 'blinkBuilder', 
      label: 'Blink Builder', 
      icon: '🔗' 
    }
  ];

  const handleAddNode = (type: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      data: { label: type }
    };

    onAddNode(newNode);
  };

  return (
    <div className="flow-toolbar">
      {nodeTypes.map((node) => (
        <div
          key={node.id}
          onClick={() => handleAddNode(node.id)}
          className="toolbar-item"
        >
          <div className="icon-wrapper">
            {typeof node.icon === 'string' ? (
              <span className="text-2xl">{node.icon}</span>
            ) : (
              node.icon
            )}
          </div>
          <span className="label">{node.label}</span>
        </div>
      ))}
    </div>
  );
}; 