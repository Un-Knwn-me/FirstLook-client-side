import './App.css';
import { Route, Routes } from 'react-router-dom';
import Mens from './pages/Mens';
import Cart from './pages/Cart';
import ProductView from './pages/ProductView';

function App() {
  return (
   <>
   <Routes>

    {/* <Route exact path='/' element={} /> */}

    <Route path='/men' element={<Mens />} />

    <Route path='/men/:id' element={<ProductView />} />

    <Route path='/cart/:id?' element={<Cart />} />
    
   </Routes>
   </>
  );
}

export default App;
