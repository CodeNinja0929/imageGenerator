import { useState, useContext, useEffect } from 'react';

import { ImageContext } from '@/pages/TextToImage';
import { useAuth } from '@/contexts/AuthProvider';

import { PublishModal, ImageModal, ImageCard } from './ImageView/index.js';

const ImageView = () => {
  const [images, setImages] = useContext(ImageContext);
  const { AuthenticatedFetch } = useAuth();
  const [showImage, setShowImage] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [showPublish, setShowPublish] = useState(false);
  const [publishId, setPublishId] = useState('');

  useEffect(() => {
    setPublishId(modalImage.id);
  }, [modalImage]);

  const onDelete = (id) => {
    AuthenticatedFetch('DELETE', `/v1/image/${id}`).then(() => {
      setImages((prvImages) => prvImages.filter((img) => img.id !== id));
    });
  };

  const onDownload = (id) => {
    const image = images.find((img) => img.id === id);
    if (!image) return;

    const a = document.createElement('a');
    a.href = image.src.url;
    a.download = `image-${id}.jpeg`;
    a.click();
  };

  const onShare = (id) => {
    setShowPublish(true);
    setPublishId(id);
  };

  const onClose = () => {
    setShowImage(false);
  };

  const onPublish = ({ title, category, description }) => {
    const status = {
      isPublished: true,
      title,
      category,
      description,
    };

    const updatedImages = images.map((image) =>
      image.id === publishId
        ? {
            ...image,
            src: {
              ...image.src,
              ...status,
            },
          }
        : image
    );

    AuthenticatedFetch('PATCH', `/v1/image/${publishId}`, status).then(() => {
      setImages(updatedImages);
      setShowPublish(false);
    });
  };

  return (
    <div className="relative">
      <div className="!overflow-hidden px-4 py-6 mt-[6px]">
        <div className="gallery">
          {[...images].reverse().map((image) => (
            <ImageCard
              key={image.id + image.isPublished}
              img={image}
              onDelete={onDelete}
              onDownload={onDownload}
              onShare={onShare}
              setShowImage={setShowImage}
              setModalImage={setModalImage}
              setShowPublish={setShowPublish}
            />
          ))}
        </div>
      </div>
      {showImage && (
        <ImageModal img={modalImage} onClose={onClose} showPublish={showPublish} setShowPublish={setShowPublish} />
      )}

      {showPublish && (
        <PublishModal
          closePublish={() => {
            setShowPublish(false);
          }}
          onPublish={onPublish}
        />
      )}
    </div>
  );
};

export default ImageView;
