import "./storebook.css"
import { useContext, useRef } from "react"
import { myContext } from "../App"
import { useState } from "react";

function Store() {
  const items = [
    { name: "Fair Record", price: "₹100" },
    { name: "Fair Record (with graph)", price: "₹110" },
    { name: "Lab Manual", price: "₹80" },
    { name: "Rough Record", price: "₹50" },
    { name: "Rough Record Ruled", price: "₹60" },
    { name: "Notebook", price: "₹50" }
  ];

  const {isLoginOpen,setLoginOpen,setSignupOpen,isLoggedIn,setLoggedIn}=useContext(myContext)


  const [arr,setArr] = useState(Array(6).fill("notBooked"))


  const checkLogin=(index)=>{
    if(!isLoggedIn){
      setLoginOpen(true)
    }
    else{
      const updatedArr = [...arr]; // Create a new copy
      updatedArr[index] = "booked"; // Modify the copy
      setArr(updatedArr);
    }}
  


  return (
    <div className="cardContainer">
      {items.map((item, index) => (
        <div className="card" key={index}>
          <img src="https://placehold.co/100" alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.price}</p>

          { (!isLoggedIn || (arr[index]=="notBooked")) &&
            (<button type="button" className="bookBtn" onClick={()=>{checkLogin(index)}}>Book now</button>)
          }

          {isLoggedIn && arr[index]==="booked" && (<p className="bookedText">✅ Booked</p>)}


          {console.log(index,arr[index])}


        </div>
      ))}
    </div>
  );
}

export default Store;
