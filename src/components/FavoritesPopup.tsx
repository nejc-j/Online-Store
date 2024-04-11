import React, { useRef, useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPopup = ({ heartRef }) => {
  const { favorites } = useFavorites();
  const popupRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({
    visibility: 'hidden',
    top: '-9999px',
    left: '-9999px',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (heartRef.current && popupRef.current) {
        const viewportWidth = window.innerWidth;
        const heartIconRect = heartRef.current.getBoundingClientRect();
        const popupWidth = popupRef.current.offsetWidth;
        const navbarOffset = 64;
        const topPosition = navbarOffset;
        let leftPosition =
          heartIconRect.left + heartIconRect.width / 2 - popupWidth / 2;

        if (leftPosition < 0) leftPosition = 10;
        else if (leftPosition + popupWidth > viewportWidth)
          leftPosition = viewportWidth - popupWidth - 10;

        setPopupStyle({
          visibility: 'visible',
          top: `${topPosition}px`,
          left: `${leftPosition}px`,
        });
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [heartRef, favorites.length]);

  return (
    <div
      ref={popupRef}
      style={
        {
          position: 'fixed',
          ...popupStyle,
          width: '250px',
          backgroundColor: 'white',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          zIndex: 1050,
          overflowY: 'auto',
          maxHeight: '80%',
        } as React.CSSProperties
      }
    >
      <h4 className='text-center mb-4'>Wishlist</h4>
      <div
        style={{
          width: '90%',
          height: '2px',
          backgroundColor: '#000',
          margin: '0 auto 15px auto',
        }}
      ></div>
      {favorites.length > 0 ? (
        <ul
          style={{ listStyleType: 'none', padding: 0, marginBottom: '-10px' }}
        >
          {' '}
          {favorites.map((favorite, index) => (
            <li
              key={favorite.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: index === favorites.length - 1 ? '5px' : '10px',
              }}
            >
              <span
                style={{
                  marginRight: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                {favorite.name}
              </span>
              <span
                style={{ fontSize: '14px', transform: 'translateY(-0.2rem)' }}
              >
                ${favorite.price}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className='text-center'>
          You have no items in your wishlist, try <b>adding</b> some!
        </div>
      )}
    </div>
  );
};

export default FavoritesPopup;
