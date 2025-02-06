import { useContext, useState } from "react";
import Modal from "./Modal";
import { myContext } from "../../App";
import "./log.css";

function SignupModal() {
    const { isSignupOpen, setSignupOpen, setLoginOpen } = useContext(myContext);

    const [step, setStep] = useState(1); // Step 1: Basic Info, Step 2: Additional Info
    const [message, setMessage] = useState("");

    // Step 1: Basic Info
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Step 2: Additional Info
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");

    const registerUser = async () => {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, name, department, semester })
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
        <Modal isOpen={isSignupOpen} closeModal={() => { setSignupOpen(false); setMessage(null); }}>
            <div className="modalContent">
                {step === 1 ? (
                    <>
                        <h2>Sign Up</h2>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="next" onClick={() => setStep(2) }>Next</button>
                    </>
                ) : (
                    <>
                        <h2>Additional Details</h2>
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        <input type="number" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
                        {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}
                        <div className="options">
                            <button onClick={() => setStep(1)}>Back</button>
                            <button className="submit" onClick={registerUser}>Register</button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default SignupModal;
