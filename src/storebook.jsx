import Card from "./card"   



function Store(){

    const items = [
        { name: "Fair Record", price: "₹100" },
        { name: "Fair Record (with graph)", price: "₹110" },
        { name: "Lab Manual", price: "₹80" },
        { name: "Rough Record", price: "₹50" },
        { name: "Rough Record Ruled", price: "₹60" },
        { name: "Notebook", price: "₹50" }
      ];

    return(
        <>
        <div className="cardContainer">

            {items.map((item,index)=>(
            <div className="card" >
                    <img src="https://placehold.co/100"></img>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                <button type="button" className="bookBtn">Book now</button>
            </div>
            ))}
        </div>
        </>
    )
}

export default Store