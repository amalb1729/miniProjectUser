
import Header from "./header/Header"
import Footer from "./footer/Footer"
import Test from "./test"
import Store from "./components/store/storebook"
import Filein from "./components/print/Filein"
import Profile from "./components/profile/Profile"
import Home from "./home/home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react"
import { useState } from "react"

import Loginmodal from "./components/modal/loginmodal"
import Signupmodal from "./components/modal/signupmodal"


export const myContext=createContext();

function App() {

  
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoggedIn,setLoggedIn]=useState(false)
  
  
  return (

    <>
      
      <div className="app">
      
      <myContext.Provider value={{isSignupOpen, setSignupOpen,isLoginOpen, setLoginOpen,isLoggedIn,setLoggedIn}}>

        <Header />

          <div className="content">
              
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Store />} />
            <Route path="/print" element={<Filein />} />
            <Route path="/profile" element={<Profile />} />

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
