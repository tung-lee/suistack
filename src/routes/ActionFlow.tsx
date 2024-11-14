import React, { useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  ReactFlowProvider,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { ActionNode } from "../components/CustomNodes/ActionNode";
import { QueryNode } from "../components/CustomNodes/QueryNode";
import TopNav from "../components/TopNav";
import { CodeNode } from "../components/CustomNodes/build/CodeNode";
import { BuildNode } from "../components/CustomNodes/build/BuildNode";
import { PublishNode } from "../components/CustomNodes/PublishNode";
import Sidebar from "../components/sidebar/Sidebar";
import { FlowProvider, useFlow } from "../contexts/FlowContext";
import FunctionNode from "../components/CustomNodes/build/FunctionNode";
import FormNftNode from "../components/CustomNodes/nft/FormNftNode";
import TransferNft from "../components/CustomNodes/nft/TransferNft";
import CustomEdge from "../components/CustomEdge/CustomEdge";
import SuccessNode from "../components/CustomNodes/SuccessNode";
import GetNft from "../components/CustomNodes/nft/GetNft";
import PythNode from "../components/CustomNodes/defi/PythNode";
import AfterMathNode from "../components/CustomNodes/defi/AfterMathNode";
const nodeTypes = {
  code: CodeNode,
  build: BuildNode,
  publish: PublishNode,
  action: ActionNode,
  query: QueryNode,
  function: FunctionNode,
  formNft: FormNftNode,
  transferNft: TransferNft,
  success: SuccessNode,
  getNft: GetNft,
  pyth: PythNode,
  aftermath: AfterMathNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlow();

  return (
    <>
      <Sidebar />
      <TopNav />
      <div
        className="flow-container"
        style={{
          background: "linear-gradient(65deg, #e0e6ff, #fff0f9)",
          width: "100%",
          height: "100vh",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          style={{ background: "transparent" }}
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

const ActionFlow = () => {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <Flow />
      </FlowProvider>
    </ReactFlowProvider>
  );
};

export default ActionFlow;
