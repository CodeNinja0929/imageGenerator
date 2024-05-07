import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { ShareImageCard, Pagination } from '$common';
import { publicCategory } from '../constants/filter';

const Community = () => {
  const [images, setImages] = useState([]);
  const { UnauthenticatedFetch } = useAuth();

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    UnauthenticatedFetch('GET', '/v1/image/shared').then((res) => {
      setImages(
        res.data.map((img) => ({
          id: img._id,
          src: img,
        }))
      );
    });
  }, []);

  const handleCategory = (category) => {
    if (category == 'all') {
      UnauthenticatedFetch('GET', '/v1/image/shared').then((res) => {
        setImages(
          res.data.map((img) => ({
            id: img._id,
            src: img,
          }))
        );
      });
    } else {
      UnauthenticatedFetch('GET', `/v1/image/shared/${category}`).then((res) => {
        setImages(
          res.data.map((img) => ({
            id: img._id,
            src: img,
          }))
        )
      })
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 12;

  const currentImageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return images.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, images]);

  return (
    <main className="bg-primary text-[#f7f8f8] font-inter">
      <div className="bg-primary sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1440px] w-full">
          <div className="m-auto px-[24px] pb-16 text-center justify-center items-center">
            <h2 className="lg:text-[24px] text-[21px] font-medium m-0 py-6">Explore AI Generated Art</h2>
            <p className="mb-1">Browse the best AI generated artworks created with Imaginea.</p>

            <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
              <button
                type="button"
                onClick={() => handleCategory('all')}
                className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
              >
                All categories
              </button>
              {
                publicCategory.filter(item => item.label != 'None').map((category, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCategory(category.value)}
                    className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                  >
                    {category.label}
                  </button>
                ))
              }
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* {currentImageData.map((image) => (
              <ShareImageCard
                key={image.id}
                img={image}
                isFavorited={user !== null && user.favorite_image.includes(image.id)}
              />
            ))} */}

            {images.map((image) => (
              <ShareImageCard
                key={image.id}
                img={image}
                isFavorited={user !== null && user.favorite_image.includes(image.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <Pagination
        className="mt-10 fixed bottom-0 left-0 z-50 w-full"
        currentPage={currentPage}
        totalCount={images.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
    </main>
  );
};

export default Community;
