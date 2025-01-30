
import Header from "./header/Header"
import Footer from "./footer/Footer"
import Test from "./test"
import Store from "./store/storebook"
import Filein from "./print/Filein"
import Profile from "./profile/Profile"
import Home from "./home/home"


function App() {


  return (
    <>

      <div className="app">
        <Header />

          <div className="content">
            <Filein />
          </div>
          
        <Footer />
      </div>
    </>
  )
}

export default App
