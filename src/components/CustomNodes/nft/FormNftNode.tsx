import { useState, useRef } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
// import { Upload, ImageIcon } from 'lucide-react'
import { pinata } from "../../../utils/PinataConfig";
import { useCustomWallet } from "../../../contexts/CustomWallet";
import { Transaction } from "@mysten/sui/transactions";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import axios from "axios";
import { useFlow } from "../../../contexts/FlowContext";
import { Handle, Position, useNodeId, useNodes } from "reactflow";

interface FormNftNodeProps {
  id: string;
  data: {
    label: string;
  };
}
export default function FormNftNode({ id, data }: FormNftNodeProps) {
  const nodeId = useNodeId();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { address, executeTransactionBlockWithoutSponsorship } =
    useCustomWallet();
  const { addSuccessNode } = useFlow();
  const nodeList = useNodes();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleWalrus = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const url = "https://publisher.walrus-testnet.walrus.space";
      const response = await fetch(`${url}/v1/store?epochs=1`, {
        method: "PUT",
        body: file,
      });

      if (response.status === 200) {
        const info = await response.json();
        console.log("Stored file response:", info);
        const blobId = info.newlyCreated?.blobObject?.blobId || info.alreadyCertified?.blobObject?.blobId;

        await callContractNft(blobId);

        return { info, media_type: file.type };
      } else {
        throw new Error("Failed to store file in Walrus");
      }
    } catch (error) {
      console.error("Error uploading to Walrus:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const callContractNft = async (
    url: string
  ): Promise<SuiTransactionBlockResponse> => {
    const recipient = address!;

    console.log("recipient", recipient);

    const target = `0x71b4a8861604de5daf165e1e18ef3582de8b93028265f3a510f5fd16f2f70137::contract::new_nft`;
    const txb = new Transaction();

    txb.moveCall({
      arguments: [
        txb.pure.string(name),
        txb.pure.string(description),
        txb.pure.string(url),
      ],

      target: target,
    });
    const response = await executeTransactionBlockWithoutSponsorship({
      tx: txb,
      network: "devnet",
      includesTransferTx: true,
      allowedAddresses: [recipient],
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    if (!response) {
      throw new Error("Transaction failed");
    }
    console.log("response", response);
    const objectId = response.effects?.created?.[0]?.reference?.objectId;
    const sourceNode = nodeList.find((node) => {
      console.log(node.id);
      console.log(nodeId);
      return node.id === nodeId;
    });
    console.log(sourceNode);
    const newNode = {
      id: `transferNft-${Date.now()}`,
      type: "transferNft",
      position: {
        x: (sourceNode?.position.x ?? 0) + 500,
        y: sourceNode?.position.y ?? 0,
      },
      // position: { x: 400, y: 200 },
      data: { label: "build", objectId },
    };
    console.log(newNode);
    addSuccessNode(newNode, id);
    return response;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background rounded-lg shadow-md">
      <div
        className="border-2 border-dashed border-muted-foreground rounded-lg p-4 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {preview ? (
          <div className="relative aspect-video">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            {/* <Upload className="w-12 h-12 text-muted-foreground mb-2" /> */}
            <p className="text-sm text-muted-foreground">
              Drag and drop an image here, or click to select a file
            </p>
          </div>
        )}
      </div>
      {file && (
        <div className="mt-4">
          <Label htmlFor="filename" className="text-sm font-medium">
            Selected File:
          </Label>
          <p id="filename" className="text-sm text-muted-foreground mt-1">
            {file.name}
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button 
        className="w-full mt-4" 
        onClick={handleWalrus} 
        disabled={!file || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
            Processing...
          </div>
        ) : (
          'Run'
        )}
      </Button>
      <Handle type="source" position={Position.Right} id={`input-${id}`} />
    </div>
  );
}

// 0x4fe17140e9680607bebe1f2982bc332ddc0e69a03e0de744944f0284c4405bad::contract::new_nft
