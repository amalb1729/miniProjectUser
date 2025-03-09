import Modal from "./Modal";
import { useState } from "react";
import "./fullOrderModal.css"

function FullOrderModal({ fullOrderModal, setFullOrderModal, fullOrder, setFullOrder }) {
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
                            </tr>
                        </thead>
                        <tbody>
                            {fullOrder?.orderedItems?.map((order, index) => (
                                <tr key={order?._id || index} className="order-row">
                                    <td>{order?.itemId || "ID not found"}</td>
                                    <td>{order?.itemName || "Name not found"}</td>
                                    <td>{order?.itemPrice || "Price not found"}</td>
                                    <td>{order?.itemQuantity || "Quantity not found"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </Modal>
        </>
    );
}

export default FullOrderModal;
