import { useState } from "react";
import { CodeIcon } from "../../Icons/icons";
import MoveEditor from "../../../hooks/MoveEditor";
import { useFlow } from "../../../contexts/FlowContext";
import { Handle, useNodeId, useNodes } from "reactflow";
import { Position } from "reactflow";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setBuildLoading,
  setBuildNode,
} from "../../../redux/reducers/BuildReducer";
import { Button } from "../../ui/button";

// Create a component for each node type
export const CodeNode = ({ data }) => {
  const [code, setCode] = useState("//Code here");
  // const [isLoading, setIsLoading] = useState(false)
  const nodeId = useNodeId();
  const nodeList = useNodes();
  const { addSuccessNode } = useFlow();
  const { build } = useAppSelector((state) => state.build);
  const dispatch = useAppDispatch();
  const handleBuild = async () => {
    dispatch(setBuildLoading(true));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/build`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
          }),
        }
      );
      const sourceNode = nodeList.find((node) => node.id === nodeId);
      const newNode = {
        id: `build-${Date.now()}`,
        type: "build",
        position: {
          x: (sourceNode?.position.x ?? 0) + 500,
          y: sourceNode?.position.y ?? 0,
        },
        data: { label: "build" },
      };
      if (build?.currentBuildNode === null) {
        addSuccessNode(newNode, data.id);
        dispatch(setBuildNode(newNode.id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setBuildLoading(false));
    }
  };

  return (
    <div className="custom-node code-node w-[500px]">
      <div className="relative">
        <MoveEditor code={code} setCode={setCode} />
        {build?.buildloading && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleBuild} className="mr-4">
          Build
        </Button>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
};
