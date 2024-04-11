import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useFavorites } from '../context/FavoritesContext';
import { CartItem } from '../components/CartItem';
import FavoriteItemDisplay from '../components/FavoriteItemDisplay';
import { formatCurrency } from '../utilities/formatCurrency';
import storeItems from '../data/items.json';

const Checkout = () => {
  const { cartItems, increaseCartQuantity } = useShoppingCart();
  const { favorites } = useFavorites();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const totalAmount = cartItems.reduce((total, item) => {
    const product = storeItems.find((p) => p.id === item.id);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const handleAddToCartFromFavorites = (id) => {
    increaseCartQuantity(id);
  };

  return (
    <Container className='mt-4'>
      <h2>Checkout</h2>
      <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
      <Row>
        <Col md={8}>
          <Stack gap={3}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem key={item.id} id={item.id} quantity={item.quantity} />
              ))
            ) : (
              <p className='text-center'>
                You have no items in your cart, try <b>adding</b> some!
              </p>
            )}
            <div className='ms-auto fw-bold fs-5'>
              Total {formatCurrency(totalAmount)}
            </div>
            <Button
              variant={cartItems.length > 0 ? 'success' : 'secondary'}
              className='w-100 my-2'
              disabled={cartItems.length === 0}
            >
              Pay Now
            </Button>
          </Stack>
        </Col>
        <Col md={4}>
          <h4
            className='text-center'
            style={{
              marginTop: isSmallScreen ? '30px' : '0',
              marginBottom: '30px',
            }}
          >
            Wishlist
          </h4>
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <FavoriteItemDisplay
                key={favorite.id}
                {...favorite}
                onAddToCart={() => handleAddToCartFromFavorites(favorite.id)}
              />
            ))
          ) : (
            <p className='text-center'>
              Your wishlist is empty <b>add</b> some items!
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
