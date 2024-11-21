import React, { useEffect, useState } from "react";
import { FlowToolbar } from "./FlowToolbar";
import SignInButton from "./common/SigninButton";
import { useCustomWallet } from "../contexts/CustomWallet";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import CommingToolbar from "./CommingToolbar";
import { shortenAddress } from "../lib/utils";
import { FaCopy } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

const TopNav = () => {
  const [showWeb3Toolbar, setShowWeb3Toolbar] = useState(false);
  const [showCommingSoon, setShowCommingSoon] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [clickCopy, setClickCopy] = useState(false);

  const { address, executeTransactionBlockWithoutSponsorship } =
    useCustomWallet();

  const handleExecute = async (): Promise<SuiTransactionBlockResponse> => {
    const recipient = address!;

    console.log("recipient", recipient);

    const txb = new Transaction();

    txb.moveCall({
      arguments: [
        txb.pure.string("a"),
        txb.pure.string("a"),
        txb.pure.string("A"),
      ],

      target: `0x246af8c9d832724171508b33ea982b9ee26a0a1c96d88b866feeaed83286dd7b::contract::new_herro`,
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
    return response;
  };
  const copyToClipboard = (text: string) => {
    setClickCopy(true);
    navigator.clipboard.writeText(text);
  
    setTimeout(() => {
      setClickCopy(false);
    }, 3000); // 3 seconds
  };
  return (
    <div className="flex justify-between absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
      <div>
        <img src="/SUI_STACK_LOGO.png" alt="logo" className="w-30 h-10" />
      </div>
      <div className="  bg-custom-gradient text-white rounded-full p-1 flex gap-2 ">
        <div
          className="relative flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer group"
          onMouseEnter={() => setShowWeb3Toolbar(true)}
          onMouseLeave={() => setShowWeb3Toolbar(false)}
        >
          <img src="/sui.png" alt="sui" className="w-4 h-4" />
          <span>Sui</span>

          {showWeb3Toolbar && (
            <div className="absolute top-full left-0">
              <div className="mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-2">
                <FlowToolbar />
              </div>
            </div>
          )}
        </div>
        <div
          className="relative flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer group"
          onMouseEnter={() => setShowAddress(true)}
          onMouseLeave={() => setShowAddress(false)}
        >
          <span className="text-xl">🌐</span>
          <span>Sui Stack</span>
          {(showAddress && address!==undefined)&& (
     
               <div className="absolute top-full w-[130px]">
                <div className="mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-2">
                  {shortenAddress(address ?? "")}
                  <span> </span><button
                    onClick={() => copyToClipboard(address ?? "")}
                    className="hover:opacity-70 transition-opacity"
                  >
                    { clickCopy? <SiTicktick className="text-green-400"/>:<FaCopy /> } 


                  </button>
                </div>
              </div> 
           
          )}
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 rounded-full cursor-pointer"
          onMouseEnter={() => setShowCommingSoon(true)}
          onMouseLeave={() => setShowCommingSoon(false)}
        >
          <span>Apps</span>
          {showCommingSoon && (
            <div className="absolute top-full left-46">
              <div className="mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-2">
                <CommingToolbar />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-transparent border-2 border-solid border-black rounded-lg px-4 py-2"
          onClick={handleExecute}
        >
          Run
        </button>
        <button className="bg-custom-gradient text-white rounded-lg px-4 py-2">
          Save
        </button>
        {/* <SignInButton /> */}
      </div>
    </div>
  );
};

export default TopNav;
