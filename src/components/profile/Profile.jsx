import { useContext, useEffect,useState } from "react";
import { myContext } from "../../App";
import "./profile.css";
import FullOrderModal from "../modal/fullOrderModal";
import ImageUploader from "./imageUploader"
import { IKImage } from 'imagekitio-react';
import { use } from "react";
import QRGenerator from "./QRGenerator";
function Profile() {
    const { user,setUser } = useContext(myContext);
    const [pendingOrders, setPendingOrders] = useState(null);// refers to the object of currently pending order
    const [completedOrders, setCompletedOrders] = useState(null); // refers to the array of completed or cancelled order


    const [pendingOrderShow,setPendingOrderShow]=useState(false) //to show pending order
    const [completedOrderShow,setCompletedOrderShow]=useState(false)//to show the table of completed or cancelled orders
    const [fullOrderModal,setFullOrderModal]=useState(false) // to show the specific complete order in a modal
    const [fullOrder,setFullOrder]=useState(null) // refers to the oject of complete order we are showing in complete modal

    useEffect(()=>{
        fetch(`/api/order/orders/${user.userId}`)
        .then(res=>res.json())
        .then(data=>{
                    setPendingOrders(data.pendingOrders);
                    setCompletedOrders(data.completedOrders);
                    console.log(data)
                    })
        .catch(error=>{console.log(error)})
    },[])

    useEffect(()=>{
        console.log(user)
    },[user])   

    useEffect(()=>{
        if(completedOrders){
            completedOrders.forEach((complete)=>{
            console.log("completed")
            complete.orderedItems.forEach((order,index) => { 
                console.log(order._id,order.itemId,order.itemName,order.itemPrice,order.itemQuantity)
        })})}
    
    },[])

    useEffect(()=>{
        if(pendingOrders){
            console.log("pending")
            pendingOrders.orderedItems.forEach((order,index) => { 
                console.log(order._id,order.itemId,order.itemName,order.itemPrice,order.itemQuantity)
        })}
    },[])

    const showModalFN=(id,status)=>{
            if(status!="Pending")
                setFullOrder(completedOrders.find((element)=>{return element._id==id}))
            else{
                setFullOrder(pendingOrders.find((element)=>{return element._id==id}))
            }
            setFullOrderModal(true)
    }

    const completeleModalProps={fullOrderModal,setFullOrderModal,fullOrder,setFullOrder}
    return (
        <>
            <div className="profile">
                <div className="profileDetails">

                    <ImageUploader user={user} setUser={setUser}/>

                    <p>Name: {user?.name || "N/A"}</p>
                    <p>Department: {user?.department || "N/A"}</p>
                    <p>Semester: {user?.semester || "N/A"}</p>
                </div>
            </div>
    
            {pendingOrderShow ? (
                <button className="toggleBtn" onClick={() => setPendingOrderShow(false)}>Hide Pending Orders</button>
            ) : (
                <button className="toggleBtn" onClick={() => setPendingOrderShow(true)}>Show Pending Orders</button>
            )}
    
            {pendingOrderShow ? (
                <div className="pendingOrders">
                    <h3>Pending Orders</h3>
                    <table className="orderTable">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingOrders.map((order, index) => {
                                if (order)
                                    return (
                                        <tr key={order._id}>
                                            <td>{order.orderedItems.map((item) => item.itemName).join(", ")}</td>
                                            <td>{order.status}</td>
                                            <td>{order.orderedItems.reduce((total, item) => total + item.itemPrice * item.itemQuantity, 0)}</td>
                                            <td><button className="orderBtn" onClick={() => { showModalFN(order._id, order.status) }}>Show</button></td>
                                        </tr>
                                    );
                                else
                                    return (
                                        <tr key={index}>
                                            <td>{"Items not found"}</td>
                                            <td>{"Status"}</td>
                                            <td>{"Total"}</td>
                                            <td>{"Show"}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : null}
    
            {completedOrderShow ? (
                <button className="toggleBtn" onClick={() => setCompletedOrderShow(false)}>Hide Completed Orders</button>
            ) : (
                <button className="toggleBtn" onClick={() => setCompletedOrderShow(true)}>Show Completed Orders</button>
            )}
    
            {completedOrderShow ? (
                <div className="completedOrders">
                    <h3>Completed Orders</h3>
                    <table className="orderTable">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedOrders.map((order, index) => {
                                if (order)
                                    return (
                                        <tr key={order._id}>
                                            <td>{order.orderedItems.map((item) => item.itemName).join(", ")}</td>
                                            <td>{order.status}</td>
                                            <td>{order.orderedItems.reduce((total, item) => total + item.itemPrice * item.itemQuantity, 0)}</td>
                                            <td><button className="orderBtn" onClick={() => { showModalFN(order._id, order.status) }}>Show</button></td>
                                        </tr>
                                    );
                                else
                                    return (
                                        <tr key={index}>
                                            <td>{"Items not found"}</td>
                                            <td>{"Status"}</td>
                                            <td>{"Total"}</td>
                                            <td>{"Show"}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : null}
    
            {fullOrderModal ? <FullOrderModal {...completeleModalProps} /> : null}
        </>
    );
    



}

export default Profile;