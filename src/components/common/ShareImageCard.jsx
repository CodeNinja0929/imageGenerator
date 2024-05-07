import { useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { useAuth } from '../../contexts/AuthProvider';
import { Favourite, FilledFavourite, Eye, Delete } from '../../assets';

const ShareImageCard = ({ img, isFavorited = false }) => {
  const [favorited, setFavorited] = useState(isFavorited);
  const [stars, setStars] = useState(img.src.star);
  const [addClass, setAddClass] = useState(false);
  const { AuthenticatedFetch } = useAuth();

  const handleFavorite = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user !== null) {
      if (favorited == false) {
        setAddClass(true);
        setTimeout(() => {
          setAddClass(false);
        }, 2000);
      }
      setStars(stars + 1 - 2 * favorited);
      setFavorited(!favorited);
      const status = {
        userId: user.id,
        imgId: img.id,
        stars: stars + 1 - 2 * favorited,
      };

      AuthenticatedFetch('PATCH', '/v1/image/favorite', status).then((res) => {
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
      });
    } else {
      alert('Log in first');
    }
  };

  const handleDelete = (event) => {

    const ele = event.currentTarget.parentElement.parentElement;

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user !== null) {
      AuthenticatedFetch('DELETE', `/v1/image/${img.id}`).then((res) => {
        ele.remove();
      });
    }
  };

  return (
    <div className="group tile relative flex items-center">
      <Link to={`/image/${img.id}`}>
        {' '}
        <img className="rounded-[5px]" src={img.src.url} />{' '}
      </Link>
      <div className="w-full flex justify-center gap-[12px] absolute p-[10px]">
        <div className="relative flex-shrink-0">
          <button
            className="transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 hover:bg-black inline-flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9"
            onClick={handleFavorite}
          >
            {favorited ? <FilledFavourite addClass={addClass ? 'animate-ping' : ''} /> : <Favourite />}
          </button>
        </div>
        <div className="relative flex-shrink-0">
          <Link to={`/image/${img.id}`}>
            <button className="transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 hover:bg-black inline-flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9">
              <Eye addClass={'text-white'} />
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-start gap-1 bottom-[0px] absolute p-1">
        <div className="flex relative flex-shrink-0 items-center">
          <div className=" inline-flex items-center justify-center text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9">
            <img className="rounded" src={img.src.user_picture} />
          </div>
        </div>
        <div className="flex relative flex-shrink-0 items-center">
          <div className=" inline-flex items-center justify-center text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9 gap-2">
            <button>{favorited ? <FilledFavourite addClass={addClass ? 'animate-ping' : ''} /> : <Favourite />}</button>
            <p>{stars}</p>
          </div>
        </div>

        <button
          className="absolute right-1 transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 hover:bg-black inline-flex items-center justify-center bg-black bg-opacity-40 text-white font-semibold p-2 rounded-lg outline-none focus:outline-none select-none w-9 h-9"
          onClick={handleDelete}
        >
          {' '}
          <Delete />{' '}
        </button>
      </div>
    </div>
  );
};

ShareImageCard.propTypes = {
  img: PropTypes.object,
  setShowImage: PropTypes.func,
  setModalImage: PropTypes.func,
  isFavorited: PropTypes.bool,
};
export default ShareImageCard;
