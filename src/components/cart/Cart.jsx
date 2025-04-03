import { useEffect, useState, useContext } from "react";
import "./Cart.css"; // Import the CSS file
import { myContext } from "../../App";

function Cart() {
    const { user } = useContext(myContext);
    const [myCart, setMyCart] = useState([]);
    const [cartId, setCartId] = useState("");
    const [message, setMessage] = useState(""); // For showing the checkout message
    const [fade, setFade] = useState(false); // For animation effect
    const [liveStock, setLiveStock] = useState({}); // Stores real-time stock

    useEffect(() => {
        fetch(`/api/order/cart/${user.userId}`)
            .then(res => res.json())
            .then(data => {
                setMyCart(data[0].userCart);
                setCartId(data[0]._id);
            });

        fetchLiveStock(); // Fetch live stock when the cart loads
    }, []);

    const fetchLiveStock = async () => {
        try {
            const res = await fetch("/api/item/stock");
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

    const saveCart = async () => {
        try {
            console.log("Saving cart...");
            await fetch(`/api/order/saveCart/${cartId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myCart }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const checkoutCart = async () => {
        try {
            await saveCart();
            const response = await fetch(`/api/order/toOrder/${cartId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myCart }),
            });
            const data = await response.json();
            setMessage(data.message);
            setMyCart(data.updatedCart.userCart);
            fetchLiveStock();
            setFade(true); // Start fade-in effect
            setTimeout(() => setFade(false), 3000); // Remove after 3 seconds
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>

            {message && <p className={`fade-message ${fade ? "show" : ""}`}>{message}</p>}

            {myCart.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Stock</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCart.map((item) => (
                            <tr key={item.itemId}>
                                <td>{item.itemName}</td>
                                <td>₹{item.itemPrice}</td>
                                <td>
                                    <button
                                        onClick={() => decreaseQuantity(item.itemId, item.itemQuantity)}
                                    >-</button>
                                    {item.itemQuantity}
                                    <button
                                        onClick={() => increaseQuantity(item.itemId, item.itemQuantity)}
                                        disabled={item.itemQuantity >= (liveStock[item.itemId] || 0)}
                                    >+</button>
                                </td>
                                <td>{liveStock[item.itemId] || "Out Of Stock"}</td>
                                <td>₹{item.itemPrice * item.itemQuantity}</td>
                                <td>
                                    <button className="remove-btn" onClick={() => removeItem(item.itemId)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Your cart is empty</p>
            )}

            <h3>
                Total: ₹{myCart.reduce((sum, element) => sum + element.itemPrice * element.itemQuantity, 0)}
            </h3>

            <button className="checkout-btn" onClick={checkoutCart}>Proceed to Checkout</button>
            <button className="save-btn" onClick={saveCart}>Save Cart</button>
        </div>
    );
}

export default Cart;
