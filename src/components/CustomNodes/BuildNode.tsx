import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PublishState } from '../../types/PublishType';
import { setPublishState } from '../../redux/reducers/BuildReducer';
import { Button } from '../ui/button';
import axios from 'axios';

export const BuildNode = ({ data }: { data: { label: string } }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {build}=useAppSelector(state=>state.build)
  const dispatch=useAppDispatch()

  useEffect(() => {
    fetchImage().then(url => setImageUrl(url));
  }, []);

  const handlePublish = async () => {
    try {
      setLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // alert('Publish thành công! 🎉');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data: PublishState = await response.json()
      console.log(data)
      dispatch(setPublishState(data))
    } catch (error) {
      // alert('Publish thất bại');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  async function fetchImage() {
    const aggregatorUrl = 'https://aggregator.walrus-testnet.walrus.space'
    const blobId = '62-5mv22L-Xoz0_5PtjZeEI8b0y0kHCFpKKKh3s-mYY'
    try {
      const response = await axios.get(`${aggregatorUrl}/v1/${blobId}`, {
        responseType: 'blob', // Đảm bảo dữ liệu trả về là Blob
      });
      
      // Tạo URL từ Blob để hiển thị ảnh
      const imageUrl = URL.createObjectURL(response.data);
      console.log(response);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  }
  return (
    <div className="node build-node">
      <Handle type="target" position={Position.Left} />
      <div className="node-content">
        {imageUrl && <img src={imageUrl} alt="image" />}
        {/* <h3>{data.label}</h3> */}
        <div className="build-result success text-green-500">
          {build?.buildloading?"Loading...":"Build successfully ✅!"}
        </div>
        <Button
          onClick={handlePublish}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'publishing' : 'Publish'}
        </Button>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}; 