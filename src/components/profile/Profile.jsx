import { useContext, useEffect, useState, useCallback } from "react";
import { myContext } from "../../App";
import "./profile.css";
import FullOrderModal from "../modal/fullOrderModal";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropimage"; // Your crop helper

function Profile() {
    const { user } = useContext(myContext);
    const [pendingOrders, setPendingOrders] = useState(null);
    const [completedOrders, setCompletedOrders] = useState(null);
    const [pendingOrderShow, setPendingOrderShow] = useState(false);
    const [completedOrderShow, setCompletedOrderShow] = useState(false);
    const [fullOrderModal, setFullOrderModal] = useState(false);
    const [fullOrder, setFullOrder] = useState(null);

    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("https://placehold.co/100");

    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setShowCropper(true);
        }
    };

    const uploadCroppedImage = async () => {
        const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
        const formData = new FormData();
        formData.append("file", croppedBlob, "cropped.jpg");

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            setPreviewUrl(data.imageUrl); // if server returns uploaded image path
            setShowCropper(false);
        }
    };

    useEffect(() => {
        fetch(`/api/order/orders/${user.userId}`)
            .then((res) => res.json())
            .then((data) => {
                setPendingOrders(data.pendingOrders);
                setCompletedOrders(data.completedOrders);
            })
            .catch((error) => console.log(error));
    }, []);

    const showModalFN = (id, status) => {
        if (status !== "Pending")
            setFullOrder(completedOrders.find((el) => el._id === id));
        else setFullOrder(pendingOrders.find((el) => el._id === id));
        setFullOrderModal(true);
    };

    const completeleModalProps = {
        fullOrderModal,
        setFullOrderModal,
        fullOrder,
        setFullOrder,
    };

    return (
        <>
            <div className="profile">
                <div className="profileDetails">
                    <label htmlFor="profileUpload">
                        <img
                            src={previewUrl}
                            alt="Profile"
                            className="profilePic"
                            style={{ cursor: "pointer" }}
                        />
                    </label>
                    <input
                        id="profileUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <p>Name: {user?.name || "N/A"}</p>
                    <p>Department: {user?.department || "N/A"}</p>
                    <p>Semester: {user?.semester || "N/A"}</p>
                </div>
            </div>

            {showCropper && (
                <div className="crop-container">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                    <button onClick={uploadCroppedImage}>Upload</button>
                </div>
            )}

            {/* Pending Orders Toggle */}
            <button className="toggleBtn" onClick={() => setPendingOrderShow(!pendingOrderShow)}>
                {pendingOrderShow ? "Hide Pending Orders" : "Show Pending Orders"}
            </button>

            {pendingOrderShow && (
                <div className="pendingOrders">
                    <h3>Pending Orders</h3>
                    <table className="orderTable">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingOrders.map((order, i) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button className="orderBtn" onClick={() => showModalFN(order._id, order.status)}>
                                            Show
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Completed Orders Toggle */}
            <button className="toggleBtn" onClick={() => setCompletedOrderShow(!completedOrderShow)}>
                {completedOrderShow ? "Hide Completed Orders" : "Show Completed Orders"}
            </button>

            {completedOrderShow && (
                <div className="completedOrders">
                    <h3>Completed Orders</h3>
                    <table className="orderTable">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedOrders.map((order, i) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button className="orderBtn" onClick={() => showModalFN(order._id, order.status)}>
                                            Show
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {fullOrderModal && <FullOrderModal {...completeleModalProps} />}
        </>
    );
}

export default Profile;
