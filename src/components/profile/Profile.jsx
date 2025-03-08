import { useContext, useEffect,useState } from "react";
import { myContext } from "../../App";
import "./profile.css";

function Profile() {
    const { user } = useContext(myContext);
    const [pendingOrders, setPendingOrders] = useState(null);
    const [completedOrders, setCompletedOrders] = useState(null);


    const [pendingOrderShow,setPendingOrderShow]=useState(false)
    const [completedOrderShow,setCompletedOrderShow]=useState(false)
    const [competeOrderModal,setCompletedOrderModal]=useState(false)

    useEffect(()=>{
        fetch(`http://localhost:5000/order/orders/${user.userId}`)
        .then(res=>res.json())
        .then(data=>{
                    setPendingOrders(data.pendingOrders);
                    setCompletedOrders(data.completedOrders);
                    console.log(data.completedOrders)
                    })
        .catch(error=>{console.log(error)})
    },[])

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

    const showModalFN=(id)=>{
            console.log(id)
    }
    return (
        <>
        <div className="profile">
            <div className="profileDetails">
                <img src="https://placehold.co/100" alt="Profile" className="profilePic" />
                <p>Name:{user?.name || "N/A"}</p>
                <p>Department:{user?.department || "N/A"}</p>
                <p>Semester: {user?.semester || "N/A"}</p>
            </div>
            <div className="profileQr">
                <h2>QR Code</h2>
                <img src="https://placehold.co/100" alt="QR Code" className="qrCode" />
            </div>
        </div>
        
        {pendingOrderShow?(<button onClick={()=>setPendingOrderShow(false)}>hide pending orders</button>)
                    :(<button onClick={()=>setPendingOrderShow(true)}>show pending orders</button>)}
        
        {pendingOrderShow?(
        <div className="pendindOrders">
            <table>
            <thead>
                <tr>
                        <th>item id</th>
                        <th>item name</th>
                        <th>price</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                <tbody>
                {
                    pendingOrders.orderedItems.map((order,index) => {
                        if(order)
                        return(
                        <tr key={order._id}>
                            <td>{order.itemId}</td>
                            <td>{order.itemName}</td>{/* Display user's name */}
                            <td>{order.itemPrice||"item price not found"}</td>
                            <td>{order.itemQuantity}</td></tr>
                        )
                        else
                            return(
                            <tr key={index}>
                            <td>{"id not found"}</td>
                            <td>{"name"}</td>{/* Display user's name */}
                            <td>{"price"}</td>
                            <td>{"quantity"}</td></tr>
                            )
                        
                    }
                    )}
                </tbody>
            </table>
        </div>
        ):null}



        {completedOrderShow?(<button onClick={()=>setCompletedOrderShow(false)}>hide completed orders</button>)
                    :(<button onClick={()=>setCompletedOrderShow(true)}>show completed orders</button>)}

        {completedOrderShow?(
        <div className="completedOrders">
        <table>
            <thead>
                <tr>
                        <th>order id</th>
                        <th>status</th>
                        <th>show</th>
                    </tr>
                </thead>
                <tbody>
                {
                    completedOrders.map((order,index) => {
                        if(order)
                        return(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.status}</td>{/* Display user's name */}
                            <td>{<button onClick={()=>{showModalFN(id)}}>show</button>}</td></tr>
                        )
                        else
                            return(
                            <tr key={index}>
                            <td>{"id not found"}</td>
                            <td>{"name"}</td>{/* Display user's name */}
                            <td>{"price"}</td>
                            <td>{"quantity"}</td></tr>
                            )
                        
                    }
                    )}
                </tbody>
            </table>      
        </div>
        ):null}
       
        </>
    );



}

export default Profile;
