import { ActionIcon, BuildIcon, ChainQueryIcon, CodeIcon, PublishIcon } from './Icons/icons';
import { useReactFlow } from 'reactflow';

export const FlowToolbar = () => {
  const reactFlowInstance = useReactFlow();

  const nodeTypes = [
    {
      id: 'code',
      label: 'Code',
      icon: <CodeIcon className="h-6 w-6" fillColor="#6B7280" />
    },
    {
      id: 'build',
      label: 'Build',
      icon: <BuildIcon className="h-6 w-6" fillColor="#6B7280" />
    },
    {
      id: 'publish',
      label: 'Publish',
      icon: <PublishIcon className="h-6 w-6" fillColor="#6B7280" />
    },
    // {
    //   id: 'chainTx',
    //   label: 'Chain TX',
    //   icon: <ChainIcon className="h-6 w-6" fillColor="#6B7280" />
    // },
    // {
    //   id: 'chainQuery',
    //   label: 'Chain Query',
    //   icon: <ChainQueryIcon className="h-6 w-6" fillColor="#6B7280" />
    // },
    {
      id: 'action',
      label: 'Action',
      icon: <ActionIcon className="h-6 w-6" fillColor="#6B7280" />
    },
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

    reactFlowInstance.addNodes(newNode);
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