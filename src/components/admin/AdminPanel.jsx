import { useEffect, useState } from "react";
import "./adminPanel.css"
function AdminPanel() {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    // Fetch orders and items when admin logs in
    useEffect(() => {

        
        fetch("http://localhost:5000/api/orders/view")
            .then(res => res.json())
            .then(data => {setOrders(data)
                });

        

        fetch("http://localhost:5000/api/items/view")
            .then(res => res.json())
            .then(data => { setItems(data)
            console.log(data)});
    }, []);

    return (
        <div className="admin-panel">
            <h2>Admin Dashboard</h2>

               {/* Items Section */}
               <h3>Manage Items</h3>
            {items.map(item => (
                <div key={item._id}>
                    <h4>{item.name} (Stock: {item.stock})</h4>
                    <button onClick={() => console.log("Edit", item._id)}>Edit</button>
                </div>
            ))}

            
            {/* Orders Section */}
            <h3>Orders</h3>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.userId?.name || "Unknown User"}</td>  {/* Display user's name */}
                            <td>{order.itemId?.name || "Unknown Item"}</td>  {/* Display item name */}
                            <td>{order.quantity}</td>
                            <td>{order.status}</td></tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default AdminPanel;
