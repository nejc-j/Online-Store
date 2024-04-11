import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Store } from './pages/Store';
import Checkout from './pages/Checkout';
import { Navbar } from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <ShoppingCartProvider>
      <FavoritesProvider>
        <Navbar />
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Store />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </Container>
      </FavoritesProvider>
    </ShoppingCartProvider>
  );
}
export default App;
