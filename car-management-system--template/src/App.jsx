import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import Herosection from "./components/Herosection";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import CarList from './components/Cars/CarList';
import AddCar from './components/Cars/AddCar'
import Register from './components/Register';
import ProductListPage from './components/ProductListPage';

export default function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<CarList/>}/>
        <Route path="/AddCar" element={<AddCar/>}/>
        <Route path="/productListing" element={<ProductListPage/>}/>
      </Routes>
    </BrowserRouter>

  )
}