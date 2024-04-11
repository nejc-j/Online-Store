import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useFavorites, FavoriteItem } from '../context/FavoritesContext';

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const quantity = getItemQuantity(id);
  const favorite = isFavorite(id);
  const itemToAdd: FavoriteItem = { id, name, price };

  const handleAddFavorite = () => {
    if (!isFavorite(id)) {
      addFavorite(itemToAdd);
    } else {
      removeFavorite(id);
    }
  };
  return (
    <Card className='h-100 position-relative'>
      <svg
        onClick={handleAddFavorite}
        fill={favorite ? 'red' : 'white'}
        stroke={'currentColor'}
        className='bi bi-heart-fill position-absolute'
        style={{
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          width: '2.5em',
          height: '2.5em',
          userSelect: 'none',
        }}
        viewBox='0 0 32 32'
      >
        <path d='M23.5,5C20.4,5,18,7.5,18,7.5S15.6,5,12.5,5C9.2,5,7,7.3,7,10.8c0,5.1,5.5,9.2,10.3,14.5l0.7,0.7l0.7-0.7c4.8-5.3,10.3-9.4,10.3-14.5C29,7.3,26.8,5,23.5,5z' />
      </svg>

      <Card.Img
        variant='top'
        src={imgUrl}
        height='200px'
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'>{name}</span>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button className='w-100' onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: '.5rem' }}
            >
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: '.5rem' }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className='fs-3'>{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant='danger'
                size='sm'
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
