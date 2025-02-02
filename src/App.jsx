
import Header from "./header/Header"
import Footer from "./footer/Footer"
import Test from "./test"
import Store from "./store/storebook"
import Filein from "./print/Filein"
import Profile from "./profile/Profile"
import Home from "./home/home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react"
import { useState } from "react"

import Loginmodal from "./modal/loginmodal"
import Signupmodal from "./modal/signupmodal"


export const myContext=createContext();

function App() {

  
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  
  
  return (

    <>
      
      <div className="app">
      
      <myContext.Provider value={{isSignupOpen, setSignupOpen,isLoginOpen, setLoginOpen}}>

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
