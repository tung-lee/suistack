import { CodeIcon } from "../Icons/icons";

// Create a component for each node type
export const CodeNode = ({ data }) => {
  return (
    <div className="custom-node code-node">
      <CodeIcon className="h-6 w-6" fillColor="#6B7280" />
      <span>{data.label}</span>
    </div>
  );
}; 