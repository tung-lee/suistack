import { Handle, Position } from 'reactflow';
import { useEffect, useState } from 'react';
import { SuiTransactionBlockResponse } from '@mysten/sui/client';
import { useAppSelector } from '../../redux/hooks';
import { useCustomWallet } from '../../contexts/CustomWallet';
import { Transaction } from '@mysten/sui/transactions';
import { Button } from '../ui/button';
import { shortenAddress } from '../../lib/utils';

interface FunctionNodeProps {
  data: {
    name: string;
    args: string[];
  };
}

const FunctionNode = ({ data }: FunctionNodeProps) => {
  const [inputs, setInputs] = useState<string[]>(new Array(data.args.length).fill(''));
  const { address, executeTransactionBlockWithoutSponsorship } = useCustomWallet();
  const [functionName, setFunctionName] = useState<string>("")
  useEffect(()=>{
    const packageId = data.name.split("::")[0]
    setFunctionName(shortenAddress(packageId)+"::"+data.name.split("::")[1]+"::"+data.name.split("::")[2])
    // console.log("packageId", shortenAddress(packageId));
  },[])
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };


  const handleRun = async (): Promise<SuiTransactionBlockResponse> => {
    const recipient = address!;

    console.log("recipient", recipient);

    const txb = new Transaction();
    const txArgs = inputs.map((input, index) => {
      const argType = data.args[index].toLowerCase();
      return argType === 'u64' ? txb.pure.u64(Number(input)) : txb.pure.string(input);
    });

    const target = `${data.name}`;

    txb.moveCall({
      arguments: txArgs,
      target,
    });

    const response = await executeTransactionBlockWithoutSponsorship({
      tx: txb,
      network: 'devnet',
      includesTransferTx: true,
      allowedAddresses: [recipient],
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    if (!response) {
      throw new Error('Transaction failed');
    }
    console.log("response", response);
    return response;
  };
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="font-bold text-sm">{functionName}</div>
        </div>
        
        {data.args.map((argType, index) => (
          <div key={index} className="mt-2">
            <label className="text-xs text-gray-500">{argType}</label>
            <input
              type={argType.toLowerCase() === 'u64' ? 'number' : 'text'}
              className="border rounded px-2 py-1 w-full text-sm"
              placeholder={`Enter ${argType}`}
              value={inputs[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <Handle
              type="target"
              position={Position.Left}
              id={`input-${index}`}
              style={{ left: -10, top: '50%' }}
            />
          </div>
        ))}

        <Button
          onClick={handleRun}
        >
          Run Contract
        </Button>

      </div>
    </div>
  );
};

export default FunctionNode;
