import React, { useState } from "react";
import { FlowToolbar } from "./FlowToolbar";
import SignInButton from "./common/SigninButton";
import { useCustomWallet } from "../contexts/CustomWallet";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

const TopNav = () => {
  const [showWeb3Toolbar, setShowWeb3Toolbar] = useState(false);
  const { address, executeTransactionBlockWithoutSponsorship } = useCustomWallet();
  const handleExecute = async (): Promise<SuiTransactionBlockResponse> => {
    const recipient = address!;

    console.log("recipient", recipient);

    const txb = new Transaction();

    txb.moveCall({
      arguments:[txb.pure.string("a"),txb.pure.string("a"),txb.pure.string("A")],

      target: `0x246af8c9d832724171508b33ea982b9ee26a0a1c96d88b866feeaed83286dd7b::contract::new_herro`,
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
    <div className="flex justify-between absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
      <div>Logo</div>
      <div className="  bg-blue-500 text-white rounded-full p-1 flex gap-2 ">
        <div
          className="relative flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer group"
          onMouseEnter={() => setShowWeb3Toolbar(true)}
          onMouseLeave={() => setShowWeb3Toolbar(false)}
        >
          <span className="text-xl">⬡</span>
          <span>Sui</span>

          {showWeb3Toolbar && (
            <div className="absolute top-full left-0">
              <div className="mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-2">
                <FlowToolbar />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer">
          <span className="text-xl">🌐</span>
          <span>Web2</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer">
          <span className="text-xl">⋈</span>
          <span>Apps</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-gray-200 text-blue-500 rounded-full px-4 py-2" onClick={handleExecute}>Run</button>
        <button className="bg-blue-500 text-white rounded-full px-4 py-2">Save</button>
        {/* <SignInButton /> */}
      </div>

    </div>
  );
};

export default TopNav;
