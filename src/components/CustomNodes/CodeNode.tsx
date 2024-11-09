import { useState } from "react";
import { CodeIcon } from "../Icons/icons";
import MoveEditor from "../../hooks/MoveEditor";

// Create a component for each node type
export const CodeNode = ({ data }) => {
  const [code,setCode]=useState('//Code here')
  return (
    <div className="custom-node code-node w-[500px]">
      {/* <CodeIcon className="h-6 w-6" fillColor="#6B7280" /> */}
      <MoveEditor code={code} setCode={setCode} />

      <span>{data.label}</span>
    </div>
  );
}; 