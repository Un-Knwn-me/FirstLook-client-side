import './App.css';
import { Route, Routes } from 'react-router-dom';
import Mens from './pages/Mens';
import Cart from './pages/Cart';
import ProductView from './pages/ProductView';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export const Backend_URL = "http://localhost:8080";
export const token = sessionStorage.getItem('token');

function App() {
  return (
   <>
   <Routes>

    <Route exact path='/' element={<Login />} />

    <Route path='/signup' element={<SignUp />} />

    <Route path='/men' element={<Mens />} />

    <Route path='/men/:id' element={<ProductView />} />

    <Route path='/cart/:id/:qty' element={<Cart />} />
    
   </Routes>
   </>
  );
}

export default App;