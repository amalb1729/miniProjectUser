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
            placeholder="Search items..."
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
        {filterItems.map((item,index) => (
          <div className="card" key={item._id} ref={(el) => (itemRefs.current[item._id] = el)}>
            {/* <img src={`/api/images/${item.name}.jpg`}  onError={(e) => (e.target.src = "https://placehold.co/100")} alt={item.name} /> */}
            <IKImage
              path={item.pictureURL}
              urlEndpoint={import.meta.env.VITE_PUBLIC_URL_ENDPOINT}
              onError={(e) => (e.target.src = "https://placehold.co/100")} alt={item.name}
            />
            <h3>{item.name}</h3>
            <p>{`₹${item.price}`}</p>
            {/* <p>{`Stock: ${item.stock}`}</p> */}

            {/* {item.stock > 0 ? ( */}
              <>
                <div className="quantity-selector">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{quantities[item._id]}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <p>{`Total: ₹${item.price * quantities[item._id]}`}</p>
                <button className="bookBtn" onClick={() =>confirmFn(item._id)}>Add to cart</button>
              </>
             {/* ) : (
               <p className="out-of-stock">❌ Out of Stock</p>
            )} */}
          </div>
        ))}
      </div>
    </div>
    

    {confirmOrder?(<ConfirmModal {...confirmProps}/>):null}
    </>
  );

}
export default Store;
