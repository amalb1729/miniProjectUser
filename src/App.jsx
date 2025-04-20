
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Test from "./test"
import Store from "./components/store/storebook"
import Filein from "./components/print/Filein"
import Profile from "./components/profile/Profile"
import Home from "./components/home/home"
import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import { createContext } from "react"
import { useState } from "react"
import Loginmodal from "./components/modal/loginmodal"
import Signupmodal from "./components/modal/signupmodal"
import Cart from "./components/cart/Cart"

export const myContext=createContext();


function App() {

  
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [accessToken,setAccessToken] =useState("");

  const refreshRequest = async () => {
    const res = await fetch("/api/auth/token", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Session expired");
    }

    const data = await res.json();
    // Ensure accessToken is always a string
    const tokenString = typeof data.accessToken === 'string' ? data.accessToken : String(data.accessToken);
    setAccessToken(tokenString);
    return tokenString;
  };

  //const [isLoggedIn,setLoggedIn]=useState(false)
  //const [user, setUser] = useState(null);
  
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  
  return (

    <>
      
      <div className="app">
      
      <myContext.Provider value={{isSignupOpen, setSignupOpen,isLoginOpen, setLoginOpen,isLoggedIn,setLoggedIn,user, setUser,accessToken,setAccessToken,refreshRequest}}>

        <Header />

          <div className="content">
              
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Store />} />
            {/* <Route path="/print" element={<Filein />} /> */}
            <Route path="/profile" element={isLoggedIn?<Profile />:<Navigate to="/" />} />
            <Route path="/cart" element={isLoggedIn?<Cart />:<Navigate to="/" />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
          
          </div>
          

        <Footer />

        <Loginmodal />
        <Signupmodal />
      </myContext.Provider>  

      </div>

        
    </>
  )
}

export default App
