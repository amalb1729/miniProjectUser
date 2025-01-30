
import Header from "./header/Header"
import Footer from "./footer/Footer"
import Test from "./test"
import Store from "./store/storebook"
import Filein from "./print/Filein"
import Profile from "./profile/Profile"
import Home from "./home/home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  
  return (

    <>
      <div className="app">
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
      </div>
    </>
  )
}

export default App
