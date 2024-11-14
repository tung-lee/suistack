import React, { useCallback, useState } from 'react'
import { Handle, Position, useNodeId, useNodes, useReactFlow } from 'reactflow'
import { Button } from '../../ui/button'
import { useFlow } from '../../../contexts/FlowContext'
import { PriceServiceConnection } from '@pythnetwork/price-service-client'

interface PriceData {
  price: number;
  publishTime: number;
}

const PythNode = () => {
    const {addSuccessNode} = useFlow()
    const nodeId = useNodeId()
    const [priceData, setPriceData] = useState<PriceData[]>([])
    // const nodeList = useNodes()
  const handleRun = useCallback(() => {
    // const newNode = {
    //   id: `aftermath-${Date.now()}`,
    //   type: 'aftermath',
    //   position: { x: 300, y: 200 },
    //   data: { label: 'Aftermath Node' }
    // };

    // const newEdge = {
    //   id: `edge-${Date.now()}`,
    //   source: nodeId,
    //   target: newNode.id,
    //   type: 'default'
    // };

    // addSuccessNode(newNode, nodeId!);
    const priceIds = [
        "0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744",
      ];

    const connection = new PriceServiceConnection("https://hermes.pyth.network");
    
    
    
    
    connection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
      connection.getLatestPriceFeeds(priceIds).then((priceFeeds) => {
        console.log(priceFeeds[0])
        const newPriceData: PriceData = {
            price: priceFeeds[0].emaPrice.price,
            publishTime: priceFeeds[0].emaPrice.publishTime
          };
          setPriceData(prevData => [...prevData, newPriceData]);
      });
    });
     
    // When using the subscription, make sure to close the WebSocket upon termination to finish the process gracefully.
    setTimeout(() => {
      connection.closeWebSocket();
    }, 60000);
  }, [nodeId, addSuccessNode]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-[250px]">
      <div className="text-lg font-semibold mb-4 pb-2 border-b">
       <img src={'/pyth.png'} alt="Pyth" className="w-[20px] h-6" /> <span>Pyth Node</span>
      </div>
      <div className="space-y-3">
        <div>
          <input 
            type="text"
            placeholder="Price ID"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div>
          <input 
            type="text"
            placeholder="Token Amount"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div>
          <input 
            type="text"
            placeholder="Target Percentage"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <Button onClick={handleRun}>Run</Button>
      </div>
      <div>
        {priceData.map((data) => (
          <div>{data.price}/{data.publishTime}</div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default PythNode
