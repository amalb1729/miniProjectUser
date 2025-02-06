import { useContext, useState } from "react";
import Modal from "./Modal";
import { myContext } from "../App";
import "./log.css";

function SignupModal() {


    const { isSignupOpen, setSignupOpen, setLoginOpen } = useContext(myContext);
    const [message, setMessage] = useState("");

    const registerUser = async () => {
        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("✅ Registration Successful!");
            setTimeout(() => {
                setSignupOpen(false);
                setLoginOpen(true);
                setMessage(null);
            }, 2000);
        } else {
            setMessage("❌ " + data.message);
        }
    };



    return (
        <Modal isOpen={isSignupOpen} closeModal={() => {setSignupOpen(false); setMessage(null);}}>
            <div className="modalContent">
                <h2>Sign Up</h2>
                <input type="text" id="username" placeholder="Username" />
                <input type="email" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}
                <div className="options">
                    <button onClick={() => { setSignupOpen(false); setLoginOpen(true);setMessage(null); }}>Login Now</button>
                    <button className="submit" onClick={registerUser}>Register</button>
                </div>
            </div>
        </Modal>
    );
}

export default SignupModal;
