import { createContext, useEffect, useState } from 'react';
import { ParametersSetting, ImageView } from '@/containers/TextToImage';
import { useAuth } from '@/contexts/AuthProvider';

export const ImageContext = createContext();

const TextToImage = () => {
  const [images, setImages] = useState([]);

  const { AuthenticatedFetch } = useAuth();

  useEffect(() => {
    AuthenticatedFetch('GET', '/v1/image', undefined).then((res) => {
      setImages(
        res.data.map((img) => ({
          id: img._id,
          src: img,
        }))
      );
    });
  }, []);

  return (
    <main className="bg-primary text-[#f7f8f8] font-inter">
      <div className="grid grid-cols-[400px_1fr]">
        <ImageContext.Provider value={[images, setImages]}>
          <ParametersSetting />
          <ImageView />
        </ImageContext.Provider>
      </div>
    </main>
  );
};

export default TextToImage;
