import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';

type FavoriteItemProps = {
  id: number;
  name: string;
  price: number;
  onAddToCart: (id: number) => void;
};

const FavoriteItemDisplay: React.FC<FavoriteItemProps> = ({
  id,
  name,
  price,
  onAddToCart,
}) => {
  return (
    <Card className='mb-3'>
      <Card.Body className='d-flex justify-content-between align-items-center'>
        <div>
          <Card.Title className='mb-1'>{name}</Card.Title>
          <Card.Text className='mb-1'>
            Price: <b>{formatCurrency(price)}</b>
          </Card.Text>
        </div>
        <Button
          onClick={() => onAddToCart(id)}
          variant='primary'
          style={{
            height: '30px',
            width: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FavoriteItemDisplay;
