import { useState } from "react"
import "./profile.css"

function Profile() {
    const [stname, setStname] = useState("sample_name")
    const [stdep, setStdep] = useState("sample_dep")
    const [styear, setStyear] = useState("sample_year")

    return (
        <div className="profile">
            <div className="profileDetails">
                <img src="https://placehold.co/100" alt="Profile" />
                <p>Name: {stname}</p>
                <p>Department: {stdep}</p>
                <p>Year: {styear}</p>
            </div>

            <div className="profieQr">
                <h2>QR Code</h2>
                <img src="https://placehold.co/100" alt="QR Code" />
            </div>
        </div>
    )
}

export default Profile
