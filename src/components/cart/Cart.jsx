import { useEffect, useState, useContext } from "react";
import "./Cart.css"; // Import the CSS file
import { myContext } from "../../App";

function Cart() {
    const { user,accessToken,refreshRequest } = useContext(myContext);
    const [myCart, setMyCart] = useState([]);
    const [cartId, setCartId] = useState("");
    const [message, setMessage] = useState(""); // For showing the checkout message
    const [fade, setFade] = useState(false); // For animation effect
    const [liveStock, setLiveStock] = useState({}); // Stores real-time stock

    useEffect(() => {
        const fetchCart = async (token = accessToken) => {
            try {
                if (!token) {
                    token = await refreshRequest();
                }
                let res = await fetch(`/api/order/cart/${user.userId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                
                if (res.status === 401) {                                       
                    token = await refreshRequest();
                    res = await fetch(`/api/order/cart/${user.userId}`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });                   // Fetch live stock when the cart loads
                }
                
                const data = await res.json();
                setMyCart(data[0].userCart);
                setCartId(data[0]._id);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        if (user && user.userId) {
            fetchCart();
            fetchLiveStock();
        }
    }, []);

    const fetchLiveStock = async (token=accessToken) => {
        try {
            
            if(!token){
                token=await refreshRequest();
            }
            let res = await fetch("/api/item/stock",{
                method:"GET",
                headers:{"Authorization":`Bearer ${token}`}
            });

            if (res.status === 401) {                                       
                const token=await refreshRequest();
                res = await fetch("/api/item/stock",{
                    method:"GET",
                    headers:{"Authorization":`Bearer ${token}`}
                });                  
            }   
            
           


            const stockData = await res.json();
            // Convert array to object for quick lookup
            const stockMap = stockData.reduce((acc, item) => {
                acc[item._id] = item.stock;
                return acc;
            }, {});
            setLiveStock(stockMap);
        } catch (error) {
            console.log("Error fetching stock:", error);
        }
    };

    const decreaseQuantity = (id, value) => {
        setMyCart(prev =>
            prev.map(element =>
                element.itemId === id ? { ...element, itemQuantity: Math.max(value - 1, 1) } : element
            )
        );
    };

    const increaseQuantity = (id, value) => {
        const maxStock = liveStock[id] || 0; // Get max available stock
        setMyCart(prev =>
            prev.map(element =>
                element.itemId === id && value < maxStock
                    ? { ...element, itemQuantity: value + 1 }
                    : element
            )
        );
    };

    const removeItem = (id) => {
        setMyCart(prev => prev.filter(element => element.itemId !== id));
    };

    const saveCart = async (saving, token = accessToken) => {
    try {
        if (!token) {
            token = await refreshRequest();
        }
        let response = await fetch(`/api/order/saveCart/${cartId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ myCart }),
        });
        if (response.status === 401) {
            token = await refreshRequest();
            response = await fetch(`/api/order/saveCart/${cartId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ myCart }),
            });
        }
        if (saving) {
            const data = await response.json();
            setMessage(data.message);
            setFade(true); // Start fade-in effect
            setTimeout(() => setFade(false), 3000); // Remove after 3 seconds
        }
    } catch (error) {
        console.log(error);
    }
};

    useEffect(()=>{
        if(myCart?.length < 1){
            saveCart(false);
        }
    },[myCart])

    const checkoutCart = async (token = accessToken) => {
    try {
        await saveCart(false, token);
        if (!token) {
            token = await refreshRequest();
        }
        let response = await fetch(`/api/order/toOrder/${cartId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ myCart }),
        
        });
        if (response.status === 401) {
            token = await refreshRequest();
            response = await fetch(`/api/order/toOrder/${cartId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ myCart }),
            });
        }
        const data = await response.json();
        console.log(data)
        setMyCart(data.updatedCart?.userCart || null );
        fetchLiveStock();
        setMessage(data.message);
        setFade(true); // Start fade-in effect
        setTimeout(() => setFade(false), 3000); // Remove after 3 seconds
    } catch (error) {
        console.log(error);
    }
};

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>

            {message && <div className={`fade-message ${fade ? "show" : ""}`}>{message}</div>}

            {myCart?.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Available</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCart.map((item) => (
                                <tr key={item.itemId}>
                                    <td>{item.itemName}</td>
                                    <td>₹{item.itemPrice.toLocaleString()}</td>
                                    <td>
                                        <div className="quantity-control">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => decreaseQuantity(item.itemId, item.itemQuantity)}
                                            >-</button>
                                            <span>{item.itemQuantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => increaseQuantity(item.itemId, item.itemQuantity)}
                                                disabled={item.itemQuantity >= (liveStock[item.itemId] || 0)}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td>
                                        {liveStock[item.itemId] ? (
                                            <span>{liveStock[item.itemId]}</span>
                                        ) : (
                                            <span style={{ color: "#dc3545", fontWeight: "bold" }}>Out Of Stock</span>
                                        )}
                                    </td>
                                    <td>₹{(item.itemPrice * item.itemQuantity).toLocaleString()}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => removeItem(item.itemId)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>
                        Total: ₹{myCart.reduce((sum, element) => sum + element.itemPrice * element.itemQuantity, 0).toLocaleString()}
                    </h3>

                    <div className="cart-actions">
                        <button className="checkout-btn" onClick={()=>{checkoutCart()}}>Proceed to Checkout</button>
                        <button className="save-btn" onClick={()=>{saveCart(true)}}>Save Cart</button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart-message">
                    <p>Your cart is empty</p>
                    <p>Add items to your cart to see them here</p>
                </div>
            )}
        </div>
    );
}

export default Cart;
