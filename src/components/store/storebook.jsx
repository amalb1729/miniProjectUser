import "./storebook.css";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";

function Store() {
  const { isLoginOpen, setLoginOpen, isLoggedIn, user } = useContext(myContext);
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orderMessage, setOrderMessage] = useState(""); // Store order response

  // Fetch items from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/items/view")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        const initialQuantities = {};
        data.forEach(item => initialQuantities[item._id] = 1);
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 1, items.find(item => item._id === id).stock)
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1)
    }));
  };

  const bookItem = async (id) => {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId, itemId: id, quantity: quantities[id] })
      });

      const data = await response.json();
      if (response.ok) {
        setOrderMessage(`✅ Order placed: ${quantities[id]} item(s) booked`);
        setItems((prevItems) =>
          prevItems.map(item =>
            item._id === id ? { ...item, stock: item.stock - quantities[id] } : item
          )
        );


        setTimeout(()=>{
          setOrderMessage(null)
        },3000)

        
      } else {
        setOrderMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setOrderMessage("❌ Error placing order");
    }
  };

  return (
    <div className="store-container">
      {orderMessage && <p className="order-message">{orderMessage}</p>}

      <div className="cardContainer">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <img src="https://placehold.co/100" alt={item.name} />
            <h3>{item.name}</h3>
            <p>{`₹${item.price}`}</p>
            <p>{`Stock: ${item.stock}`}</p>

            {item.stock > 0 ? (
              <>
                <div className="quantity-selector">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{quantities[item._id]}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <p>{`Total: ₹${item.price * quantities[item._id]}`}</p>
                <button className="bookBtn" onClick={() => bookItem(item._id)}>Book now</button>
              </>
            ) : (
              <p className="out-of-stock">❌ Out of Stock</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
