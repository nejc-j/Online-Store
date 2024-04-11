import { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import storeItems from '../data/items.json';
import { StoreItem } from '../components/StoreItem';

export function Store() {
  const [filter, setFilter] = useState('Popular');

  const customToggleStyles = {
    border: '1px solid black',
    backgroundColor: 'transparent',
    color: 'black',
    transform: 'scale(0.8)',
  };

  const sortedItems = [...storeItems].sort((a, b) => {
    switch (filter) {
      case 'Price low to high':
        return a.price - b.price;
      case 'Price high to low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <>
      <Row className='align-items-center mb-3'>
        <Col>
          <h1 style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src='/images/icon.png'
              alt='Store Icon'
              style={{ marginRight: '20px', width: '40px', height: '40px' }}
            />
            Store
          </h1>
        </Col>
        <Col className='text-end'>
          <Dropdown>
            <Dropdown.Toggle
              variant='outline-secondary'
              id='dropdown-basic'
              style={customToggleStyles}
            >
              Filter: {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter('Popular')}>
                Popular
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Price low to high')}>
                Price low to high
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Price high to low')}>
                Price high to low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {sortedItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
