import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Banner from "./pages/Banner";
import Dashboard from './pages/Dashboard';
import About from "./pages/About"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import Help from './pages/Help';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import Vendor from './pages/Vendor';
import { AuthContext } from './context/AuthContext';

const endpoint = import.meta.env.VITE_API_URL;

function App() {
  const { user, setUser, getStores } = useContext(AuthContext)
  const navigate = useNavigate();


  useEffect(() => {
    const checkUser = async () => {
      try {
        // const isUser = Object.keys(user.value).length !== 0; // Check if user exists
        // console.log(isUser);

        const isToken = JSON.parse(localStorage.getItem("jwt"));

        if (isToken) { // If user doesn't exist
          console.log("Yes present")
          const config = {
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
            },
          };
          const res = await axios.get(`${endpoint}/api/user`, config);
          // localStorage.setItem("vegfru_token", JSON.stringify(res.data.token));
          setUser(res.data)
          getStores()
        } else {
          console.log("Token not avaialble!")
          navigate("/");
        }
      } catch (error) {
        navigate("/"); // Navigate to login page if an error occurs
      }
    }
    checkUser();
  }, [])

  return (
    <Routes>
      <Route exact path="/" element={<Banner />} />
      {user ? (
        // If user exists, show the protected routes
        <>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/help' element={<Help />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/vendor/:storeId' element={<Vendor />} />
        </>
      ) : (
        // If user doesn't exist, redirect to login page
        <Route path="*" element={navigate("/")} />
      )}
    </Routes>
  );
}

export default App;
