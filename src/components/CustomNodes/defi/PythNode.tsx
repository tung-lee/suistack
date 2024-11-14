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
    const [priceData, setPriceData] = useState<PriceData|null>(null)
    // const nodeList = useNodes()
  const handleRun = useCallback(() => {
    const priceIds = [
        "0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744",
    ];
    const connection = new PriceServiceConnection("https://hermes.pyth.network");

    // Tạo hàm để lấy giá
    const fetchPrice = async () => {
        const priceFeeds = await connection.getLatestPriceFeeds(priceIds);
        console.log(priceFeeds[0]);
        const newPriceData: PriceData = {
            price: priceFeeds[0].emaPrice.price,
            publishTime: priceFeeds[0].emaPrice.publishTime
        };
        setPriceData(newPriceData);
    };

    // Gọi lần đầu
    fetchPrice();

    // Tạo interval để gọi mỗi 5 giây
    const interval = setInterval(fetchPrice, 5000);

    // Dọn dẹp sau 1 phút
    setTimeout(() => {
        clearInterval(interval);
        connection.closeWebSocket();
    }, 60000);

    // Cleanup function khi component unmount
    return () => {
        clearInterval(interval);
        connection.closeWebSocket();
    };
  }, [nodeId, addSuccessNode]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-[250px]">
      <div className="text-lg font-semibold mb-4 pb-2 border-b">
        <div className="flex gap-2 items-center">
       <img src={'/pyth.png'} alt="Pyth" className="w-[20px] h-6" /> <span>Pyth Node</span>
        </div>
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
        {
            priceData && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Price:</span>
                            <span className="font-bold text-green-600">${priceData.price.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Time:</span>
                            <span className="font-bold text-blue-600">{new Date(priceData.publishTime * 1000).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )
        }
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default PythNode
