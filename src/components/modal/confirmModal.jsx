import Modal from "./Modal.jsx";
import { useState } from "react";

//import { myContext } from "../../App";
//import { useContext } from "react";
function ConfirmModal({confirmOrder,setConfirmOrder,setBookItemId,bookItemFn}){

    //const {confirmRemove,setConfirmRemove,confirmOrder,setconfirmOrder}=useContext(myContext);

    return(
        <>
        <Modal isOpen={confirmOrder} closeModal={()=>setConfirmOrder(false)}>
        <div>
            <span>Are you sure, you want to order this item?</span>
            <button onClick={()=>{setConfirmOrder(false);setBookItemId(null)}}>cancel</button>
            <button onClick={()=>{
                                 setConfirmOrder(false);
                                 bookItemFn();
                                 }}>order</button>
        </div>
        </Modal>
        </>
    )



}


export default ConfirmModal