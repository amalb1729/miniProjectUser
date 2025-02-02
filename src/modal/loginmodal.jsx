import { useContext } from "react"
import Modal from "./modal"
import { myContext } from "../App"
import './log.css'

function Loginmodal(){

    const {isLoginOpen,setLoginOpen}=useContext(myContext)

    return(
    <Modal isOpen={isLoginOpen} closeModal={() => setLoginOpen(false)}>
        <div className="modalContent">
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className="submit">Submit</button>
        </div>
    </Modal>

    )

}


export default Loginmodal