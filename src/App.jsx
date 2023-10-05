import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Banner from "./pages/Banner";
import Dashboard from './pages/Dashboard';
import About from "./pages/About"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import Success from "./pages/Success"
import Help from './pages/Help';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import Vendor from './pages/Vendor';
import { AuthContext } from './context/AuthContext';
import Orderdetail from './pages/Orderdetail';
import PrivateRoutes from './components/PrivateRoutes';
import { isLogin } from './components/logics/logics';
import Cancel from './pages/Cancel';

function App() {
  const { fetchUser, getLocation, fetchAddress, fetchOrder } = useContext(AuthContext)
  useEffect(() => {
    if (isLogin()) {
      fetchUser();
      fetchAddress();
      fetchOrder();
    }
    getLocation();
  }, [])
  return (
    <Routes>
      <Route exact path="/" element={<Banner />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/about' element={<About />} />
      <Route path='/help' element={<Help />} />
      <Route path='/route' element={<PrivateRoutes />} >
        <Route path='profile' element={<Profile />} />
        <Route path='checkout/itemtotal/:itemTotal/tax/:tax/dist/:distance/bill/:totalBill/deliveryfair/:deliveryFair' element={<Checkout />} />
        <Route path='vendor/:storeId' element={<Vendor />} />
        <Route path='order-details/:orderId' element={<Orderdetail />} />
        <Route path='success' element={<Success />} />
        <Route path='cancel' element={<Cancel />} />
      </Route>
    </Routes>
  );
}

export default App;
