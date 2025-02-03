import { useContext, useRef } from "react"
import Modal from "./modal"
import { myContext } from "../App"
import './log.css'
import { useState } from "react"

function Loginmodal(){

    const {isLoginOpen,setLoginOpen,setSignupOpen,isLoggedIn,setLoggedIn}=useContext(myContext)

    const userRef=useRef(null)
    const passRef=useRef(null)

    const [message, setMessage] = useState("");
    const checkpw=()=>{
        if(userRef.current.value=="user" && passRef.current.value=="pass"){
            setMessage("✅ Login Successful!");
            setTimeout(()=>{
                setLoggedIn(true)
                setLoginOpen(false)
                setMessage(null);
            },2000)
        }
        else {
            setMessage("❌ Incorrect Username or Password.");
            userRef.current.value="" 
            passRef.current.value=""

        }
    
    }


    return(
    <Modal isOpen={isLoginOpen} closeModal={() => {setLoginOpen(false);setMessage(null);}}>
        <div className="modalContent">
            <h2>Login</h2>
            <input type="text" placeholder="Username" ref={userRef}/>
            <input type="password" placeholder="Password" ref={passRef}/>

            {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}

            <div className="options">
                <button onClick={()=>{ setLoginOpen(false); setSignupOpen(true); }}>Register Now</button>
                <button className="submit" onClick={checkpw}>Submit</button>
            </div>

        </div>
    </Modal>

    )

}


export default Loginmodal