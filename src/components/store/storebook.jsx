import "./storebook.css";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import ConfirmModal from "../modal/confirmModal";
import { useRef } from "react";

import { IKImage } from 'imagekitio-react';


function Store() {
  const { isLoginOpen, setLoginOpen, isLoggedIn, user } = useContext(myContext);
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orderMessage, setOrderMessage] = useState(""); // Store order response
  const [confirmOrder,setConfirmOrder]=useState(false)
  const [bookItemId,setBookItemId]=useState(null);


  const itemRefs=useRef({});

  const [query,setQuery]=useState("")
  const [filterItems,setFilteredItems]=useState([])


  // Fetch items from backend
  useEffect(() => {
    fetch("/api/item/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        const initialQuantities = {};
        data.forEach(item => initialQuantities[item._id] = 1);
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error("Error fetching items:", error));
  },[]);


  useEffect(()=>{
    if(query.trim()==="")
      setFilteredItems([...items]);
    if(query && items){
      console.log(itemRefs)
      setFilteredItems([...items.filter((item)=>(item.name.toLowerCase().includes(query.toLowerCase())))])
    }
  },[query,items])

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      //[id]: Math.min(prev[id] + 1, items.find(item => item._id === id).stock)
      [id]: prev[id] + 1
    }));
  };


  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1)
    }));
  };

  const confirmFn=(id)=>{
    setConfirmOrder(true)
    setBookItemId(id)
  }

  
  const bookItemFn = async () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    if(bookItemId){
      console.log("item bookded")
    try {
      const response = await fetch("/api/order/toCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId, itemId: bookItemId, quantity: quantities[bookItemId] })
      });

      const data = await response.json();
      if (response.ok) {
        setOrderMessage(`✅ item added to cart: ${quantities[bookItemId]} item(s) booked`);
        setItems((prevItems) =>
          prevItems.map(item =>
            item._id === bookItemId ? { ...item, stock: item.stock - quantities[bookItemId] } : item
          )
        );

        setQuantities((prev)=>({...prev,[bookItemId]:1}))
        setBookItemId(null);

        setTimeout(()=>{
          setOrderMessage(null)
        },3000)

        
      } else {
        setOrderMessage(`❌ ${data.message}`);
        setTimeout(()=>{
          setOrderMessage(null)
        },3000)
      }
    } catch (error) {
      setOrderMessage("❌ Error placing order");
      setTimeout(()=>{
        setOrderMessage(null)
      },3000)
    }
  }
  };

  const scroll=(id)=>{
    itemRefs.current[id].scrollIntoView({behavior:"smooth",block:"center"});
    console.log(itemRefs)
  }
  const confirmProps={confirmOrder,setConfirmOrder,setBookItemId,bookItemFn}

  return (
    <>
    <div className="store-container">


      <div className="search-container">
        <div className="search-box">
          <input 
            type="text" 
            value={query} 
            onChange={(e)=>setQuery(e.target.value)} 
            placeholder="    Search items..."
            className="search-input"
          />
          <i className="search-icon">🔍</i>
        </div>
        {/* {!filterItems ? null : (
          <div className="search-results">
            {filterItems.map((element) => (
              <div 
                key={element.id} 
                className="search-result-item"
                onClick={() => {scroll(element._id); setQuery("")}}
              >
                <span>{element.name}</span>
              </div>
            ))}
          </div>
        )} */}
      </div>

      {orderMessage && <p className="order-message">{orderMessage}</p>}


      <div className="cardContainer">
        {filterItems.length > 0 ? (
          filterItems.map((item, index) => (
            <div className="card" key={item._id} ref={(el) => (itemRefs.current[item._id] = el)}>
              <div className="card-image-container">
                <IKImage
                  path={item.pictureURL}
                  urlEndpoint={import.meta.env.VITE_PUBLIC_URL_ENDPOINT}
                  onError={(e) => (e.target.src = "https://placehold.co/200x200/f0f0f0/666666?text=No+Image")}
                  alt={item.name}
                  className="card-image"
                  loading="lazy"
                  transformation={[{
                    height: "200",
                    width: "200"
                  }]}
                />
              </div>
              
              <div className="card-content">
                <h3 className="item-name">{item.name}</h3>
                <div className="price-tag">
                  <span className="currency">₹</span>
                  <span className="amount">{item.price.toLocaleString()}</span>
                </div>
                
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>
                  <span>{quantities[item._id]}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>
                </div>
                
                <div className="total-price">
                  Total: <span>₹{(item.price * quantities[item._id]).toLocaleString()}</span>
                </div>
                
                <button className="bookBtn" onClick={() => confirmFn(item._id)}>
                  <span className="btn-icon">🛒</span>
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-items-found">
            <div className="no-items-icon">🔍</div>
            <h3>No items found</h3>
            <p>Try a different search term or browse all items</p>
            <button className="reset-search" onClick={() => setQuery("")}>Show all items</button>
          </div>
        )}
      </div>
    </div>
    

    {confirmOrder?(<ConfirmModal {...confirmProps}/>):null}
    </>
  );

}
export default Store;
