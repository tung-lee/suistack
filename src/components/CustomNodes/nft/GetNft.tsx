import React, { useEffect, useState } from 'react'
import { useFlow } from '../../../contexts/FlowContext'
import { useNodeId } from 'reactflow'
import { useCustomWallet } from '../../../contexts/CustomWallet'
import { useNodes } from 'reactflow'
import { Button } from '../../ui/button'
import { Transaction } from '@mysten/sui/transactions'
import { useSuiClient, useSuiClientQuery } from '@mysten/dapp-kit'

const GetNft = () => {
    const {addSuccessNode}=useFlow()
    const nodeId=useNodeId()
  const nodeList = useNodes();
  const { address,executeTransactionBlockWithoutSponsorship } = useCustomWallet();
    const suiClient=useSuiClient()
    const [nftData, setNftData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const getNft = async () => {
        try {
            setIsLoading(true)
            const data = await suiClient.getObject({
                id: '0x71b4a8861604de5daf165e1e18ef3582de8b93028265f3a510f5fd16f2f70137',
                options: {
                    showContent: true,
                    showDisplay: true,
                }
            })
            console.log(data)
            if (data.error) throw new Error("Không thể lấy dữ liệu NFT")

            if (data.data?.content?.dataType === "moveObject") {
                if (data.data.content.type.split("::").includes("NFT")) {
                    setNftData(data.data)
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (nftData) {
            console.log('NFT Data:', nftData)
            // addSuccessNode(nodeId, nodeList)
        }
    }, [nftData])
    const handleGetNft = async () => {
        await getNft()
        if (nftData) {
            console.log('NFT Data:', nftData)
            // addSuccessNode(nodeId, nodeList)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center h-[50px]'>
      <Button 
        onClick={handleGetNft} 
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get NFT'}
      </Button>
    </div>
  )
}

export default GetNft
