import Modal from "./Modal";
import { useEffect, useState } from "react";
import "./fullOrderModal.css"

function FullOrderModal({ fullOrderModal, setFullOrderModal, fullOrder, setFullOrder }) {

    const [total,setTotal]=useState(0);

    useEffect(()=>{
        fullOrder?.orderedItems?.forEach((order, index) =>  setTotal((prev)=>(prev+(order.itemPrice*order.itemQuantity))));
    },[])
    
    return (
        <>
            <Modal isOpen={fullOrderModal} closeModal={() => { setFullOrderModal(false); setFullOrder(null); }}>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {fullOrder?.orderedItems?.map((order, index) => { 
                             return(

                                
                                <tr key={order?._id || index} className="order-row">
                                    <td>{order?.itemId || "ID not found"}</td>
                                    <td>{order?.itemName || "Name not found"}</td>
                                    <td>{order?.itemPrice || "Price not found"}</td>
                                    <td>{order?.itemQuantity || "Quantity not found"}</td>
                                    <td>{order.itemPrice*order.itemQuantity}</td>
                                </tr>)
                            
                            })}
                        
                            <tr><td colSpan="4">Grand Total</td>
                            <td>{total}</td></tr>
                        </tbody>
                    </table>
            </Modal>
        </>
    );
}

export default FullOrderModal;
