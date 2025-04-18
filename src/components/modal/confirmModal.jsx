import Modal from "./Modal.jsx";
import { useState } from "react";
import "./confirmModal.css";
//import { myContext } from "../../App";
//import { useContext } from "react";
function ConfirmModal({confirmOrder,setConfirmOrder,setBookItemId,bookItemFn}){

    //const {confirmRemove,setConfirmRemove,confirmOrder,setconfirmOrder}=useContext(myContext);

    return(
        <>
        <Modal isOpen={confirmOrder} closeModal={()=>setConfirmOrder(false)}>
            <div className="confirm-modal">
                <span className="confirm-message">Are you sure, you want to add this item to cart?</span>
                <div className="confirm-buttons">
                    <button 
                        className="confirm-btn cancel"
                        onClick={()=>{setConfirmOrder(false);setBookItemId(null)}}>
                        Cancel
                    </button>
                    <button 
                        className="confirm-btn confirm"
                        onClick={()=>{
                            setConfirmOrder(false);
                            bookItemFn();
                        }}>
                        Order
                    </button>
                </div>
            </div>
        </Modal>
        </>
    )
}


export default ConfirmModal