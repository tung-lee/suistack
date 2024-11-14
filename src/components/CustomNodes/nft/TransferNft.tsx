import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Position, useNodeId, useNodes } from "reactflow";
import { Handle } from "reactflow";
import { Transaction } from "@mysten/sui/transactions";
import { useCustomWallet } from "../../../contexts/CustomWallet";
import { useFlow } from "../../../contexts/FlowContext";

const TransferNft = ({
  data,
}: {
  data: { label: string; objectId: string };
}) => {
  const [addressTransfer, setAddressTransfer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, executeTransactionBlockWithoutSponsorship } =
    useCustomWallet();
  const nodeId = useNodeId();
  const { addSuccessNode } = useFlow();
  const nodeList = useNodes();
  const handleTransfer = async () => {
    try {
      setIsLoading(true);
      // console.log("transfer")
      const txb = new Transaction();
      console.log(data.objectId);
      txb.transferObjects([txb.object(data.objectId)], addressTransfer);
      const response = await executeTransactionBlockWithoutSponsorship({
        tx: txb,
        network: "devnet",
        includesTransferTx: true,
        allowedAddresses: [address!],
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });
      const sourceNode = nodeList.find((node) => node.id === nodeId);

      const newNode = {
        id: `success-${Date.now()}`,
        type: "success",
        position: {
          x: (sourceNode?.position.x ?? 0) + 300,
          y: sourceNode?.position.y ?? 0,
        },
        data: { url: response.digest },
      };
      addSuccessNode(newNode, nodeId!);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <Input
        placeholder="Enter Wallet's Address"
        onChange={(e) => setAddressTransfer(e.target.value)}
        disabled={isLoading}
      />
      <Button 
        onClick={handleTransfer} 
        className="mt-3"
        disabled={isLoading}
      >
        {isLoading ? 'Transferring...' : 'Transfer'}
      </Button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TransferNft;
