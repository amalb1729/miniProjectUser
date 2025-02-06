import { useContext } from "react";
import { myContext } from "../../App";
import "./profile.css";

function Profile() {
    const { user } = useContext(myContext);

    return (
        <div className="profile">
            <div className="profileDetails">
                <img src="https://placehold.co/100" alt="Profile" />
                <p><strong>Name:</strong> {user?.name || "N/A"}</p>
                <p><strong>Department:</strong> {user?.department || "N/A"}</p>
                <p><strong>Semester:</strong> {user?.semester || "N/A"}</p>
            </div>
            <div className="profileQr">
                <h2>QR Code</h2>
                <img src="https://placehold.co/100" alt="QR Code" />
            </div>
        </div>
    );
}

export default Profile;
