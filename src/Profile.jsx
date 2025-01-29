import { useState } from "react"

function Profile(){


        const [stname,setStname]=useState("sample_name")
        const [stdep,setStdep]=useState("sample_dep")
        const [styear,setStyear]=useState("sample_year")

        return (
            <>

            <div className="profile">
                <div className="profileDetails">

                    <img src="https://placehold.co/100"></img>
                    <p>Name:{stname}</p>
                    <p>Department:{stdep}</p>
                    <p>Year:{styear}</p>

                </div>


                <div className="profieQr">
                    <h2>QR code</h2>
                    <img src="https://placehold.co/100"></img>
                </div>
            </div>

            </>
        )

}



export default Profile