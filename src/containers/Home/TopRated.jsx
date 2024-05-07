import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { ShareImageCard, ShareImageModal } from '$common';

const TopRated = () => {
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const { UnauthenticatedFetch } = useAuth();

  useEffect(() => {
    UnauthenticatedFetch('GET', '/v1/image/top_rate').then((res) => {
      setImages(
        res.data.map((img) => ({
          id: img._id,
          src: img,
        }))
      );
    });
  }, []);

  const onClose = () => {
    setShowImage(false);
  };

  return (
    <section className=" m-auto px-[24px] pb-16 text-center justify-center items-center">
      <div className="bg-primary sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1440px] w-full">
          <h2 className="lg:text-[24px] text-[21px] font-medium m-0 py-6">AI Art Generator Community</h2>
          <p className="mb-10">
            Join millions of other AI Art enthusiasts and explore, like and comment on the top AI generated images and AI
            styles.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <ShareImageCard key={image.id} img={image} setShowImage={setShowImage} setModalImage={setModalImage} />
            ))}
          </div>
          {showImage && <ShareImageModal img={modalImage} onClose={onClose} />}
        </div>
      </div>
    </section>
  );
};

export default TopRated;
