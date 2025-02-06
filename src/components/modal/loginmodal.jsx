import { useContext, useRef, useState } from "react";
import Modal from "./Modal";
import { myContext } from "../../App";
import "./log.css";

function LoginModal() {




    const { isLoginOpen, setLoginOpen, setSignupOpen, setLoggedIn } = useContext(myContext);
    const userRef = useRef(null);
    const passRef = useRef(null);
    const [message, setMessage] = useState("");

    const checkpw = async () => {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                username: userRef.current.value, 
                password: passRef.current.value 
            })
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("✅ Login Successful!");
            setTimeout(() => {
                setLoggedIn(true);
                setLoginOpen(false);
                setMessage(null);
            }, 2000);
        } else {
            setMessage("❌ " + data.message);
            userRef.current.value = "";
            passRef.current.value = "";
        }
    };









    return (
        <Modal isOpen={isLoginOpen} closeModal={() => { setLoginOpen(false); setMessage(null); }}>
            <div className="modalContent">
                <h2>Login</h2>
                <input type="text" placeholder="Username" ref={userRef} />
                <input type="password" placeholder="Password" ref={passRef} />

                
                {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}


                <div className="options">
                    <button onClick={() => { setLoginOpen(false); setSignupOpen(true);setMessage(null); }}>Register Now</button>
                    <button className="submit" onClick={checkpw}>Submit</button>
                </div>
            </div>
        </Modal>
    );
}

export default LoginModal;
