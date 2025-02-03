import Modal from "./modal"
import { myContext } from "../App"
import { useContext } from "react"
import './log.css'

function Signupmodal(){


    const {isSignupOpen,setSignupOpen,setLoginOpen}=useContext(myContext)

    return(
        <Modal isOpen={isSignupOpen} closeModal={() => setSignupOpen(false)}>
            <div className="modalContent">
                <h2>Sign Up</h2>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <div className="options">
                    <button onClick={()=>{ setSignupOpen(false); setLoginOpen(true); }}>Login Now</button>
                    <button className="submit">Register</button>
                </div>
            </div>
        </Modal>

    )

}


export default Signupmodal