import { useState, useRef, useEffect } from 'react';
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useFavorites } from '../context/FavoritesContext';
import FavoritesPopup from './FavoritesPopup';

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const { favorites } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const heartRef = useRef(null);
  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout';

  const favoritesButtonStyle = {
    cursor: isCheckoutPage ? 'default' : 'pointer',
    marginRight: cartQuantity > 0 ? '0.5rem' : '0',
  };

  const cartButtonStyle = {
    cursor: isCheckoutPage ? 'default' : 'pointer',
    width: '3rem',
    height: '3rem',
    position: 'relative',
    marginLeft: cartQuantity > 0 ? '1rem' : '0',
  };

  useEffect(() => {
    if (showFavorites) {
      setShowFavorites(false);
      setTimeout(() => setShowFavorites(true), 1);
    }
  }, [cartQuantity]);

  useEffect(() => {
    if (isCheckoutPage) {
      setShowFavorites(false);
    }
  }, [isCheckoutPage]);

  return (
    <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link to='/' as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        <div
          style={{ display: 'flex', alignItems: 'center', userSelect: 'none' }}
        >
          <div
            style={{ ...favoritesButtonStyle, position: 'relative' }}
            onClick={
              !isCheckoutPage
                ? () => setShowFavorites(!showFavorites)
                : undefined
            }
            ref={heartRef}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              fill={favorites.length > 0 ? 'red' : 'white'}
              style={{
                width: '48px',
                height: '48px',
                stroke: 'black',
                strokeWidth: '1.5',
              }}
            >
              <path d='M23.5,5C20.4,5,18,7.5,18,7.5S15.6,5,12.5,5C9.2,5,7,7.3,7,10.8c0,5.1,5.5,9.2,10.3,14.5l0.7,0.7l0.7-0.7c4.8-5.3,10.3-9.4,10.3-14.5C29,7.3,26.8,5,23.5,5z' />
            </svg>
            {favorites.length > 0 && (
              <div
                className='rounded-circle bg-white d-flex justify-content-center align-items-center'
                style={{
                  color: 'red',
                  width: '1.5rem',
                  height: '1.5rem',
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  border: '1px solid red',
                }}
              >
                {favorites.length}
              </div>
            )}
          </div>
          {showFavorites && <FavoritesPopup heartRef={heartRef} />}
          {cartQuantity > 0 && (
            <Button
              onClick={() => !isCheckoutPage && openCart()}
              variant='outline-primary'
              className='rounded-circle'
              style={cartButtonStyle as React.CSSProperties}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576 512'
                fill='currentColor'
              >
                <path d='M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z' />
              </svg>
              <div
                className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                style={{
                  color: 'white',
                  width: '1.5rem',
                  height: '1.5rem',
                  position: 'absolute',
                  bottom: '2.25rem',
                  right: '0',
                  transform: 'translate(25%, 25%)',
                }}
              >
                {cartQuantity}
              </div>
            </Button>
          )}
        </div>
      </Container>
    </NavbarBs>
  );
}
