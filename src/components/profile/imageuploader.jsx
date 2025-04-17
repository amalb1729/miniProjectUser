import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import React, { useEffect, useState, useRef } from 'react';

function ImageUploader({user,setUser}){
    const [url,setUrl]=useState(user.url)
    const [imageKey, setImageKey] = useState(Date.now());
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const ikUploadRef = useRef(null);

    const authenticator = async () => {
        try {
            const response = await fetch('/api/student/uploadCheck');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    const onError = err => {
        console.log("Error", err);
        setIsUploading(false);
        setUploadProgress(0);
    };
  
    const onSuccess = async(res) => {
        console.log("Success", res);
        setIsUploading(false);
        setUploadProgress(100);
        
        try {
            const response = await fetch(`/api/student/upload/${user.userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url:res.filePath })
            });
            const data = await response.json()
            console.log(data)
            setUrl(data.url)
            setImageKey(Date.now());
            
            // Reset progress after a delay
            setTimeout(() => {
                setUploadProgress(0);
            }, 2000);
        } catch (error) {
            console.log("❌ Error uploading image", error);
        }
    };

    const onUploadStart = () => {
        setIsUploading(true);
        setUploadProgress(10); // Start with some progress to show activity
    };

    const onUploadProgress = (progress) => {
        setUploadProgress(Math.min(95, progress)); // Cap at 95% until complete
    };

    const handleCustomButtonClick = () => {
        // Programmatically click the hidden IKUpload input
        if (ikUploadRef.current) {
            const uploadInput = ikUploadRef.current.querySelector('input[type="file"]');
            if (uploadInput) {
                uploadInput.click();
            }
        }
    };

    useEffect(() => {
        sessionStorage.setItem('userInfo', JSON.stringify(user));
    }, [url]);

    useEffect(() => {
        if (user?.url) { // Add a check to ensure user and user.url exist
            setUrl(user.url);
        }
    }, [user?.url]);

    useEffect(() => {
        // Apply custom styling to hide the default file input
        if (ikUploadRef.current) {
            const fileInput = ikUploadRef.current.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.style.opacity = 0;
                fileInput.style.position = 'absolute';
                fileInput.style.pointerEvents = 'none';
                fileInput.style.width = '1px';
                fileInput.style.height = '1px';
            }
        }
    }, [ikUploadRef.current]);

    return (
        <div className="profile-image-container">
            <div className="profile-image-wrapper">
                <IKContext publicKey={import.meta.env.VITE_PUBLIC_PUBLIC_KEY} urlEndpoint={import.meta.env.VITE_PUBLIC_URL_ENDPOINT} authenticator={authenticator}>
                    <IKImage 
                        key={imageKey} 
                        path={url} 
                        urlEndpoint={import.meta.env.VITE_PUBLIC_URL_ENDPOINT} 
                        onError={(e) => (e.target.src = "https://placehold.co/100")} 
                        className="profile-image"
                        alt="Profile Picture"
                    />
                    
                    <div className="upload-container" ref={ikUploadRef}>
                        <IKUpload 
                            useUniqueFileName={true} 
                            onError={onError} 
                            onSuccess={onSuccess} 
                            folder={"/images"}
                            onUploadStart={onUploadStart}
                            onUploadProgress={onUploadProgress}
                            style={{ display: 'none' }} // Hide the default component
                        />
                    </div>
                </IKContext>
                
                <button 
                    className="change-photo-btn" 
                    onClick={handleCustomButtonClick}
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Change Photo'}
                </button>
                
                {uploadProgress > 0 && (
                    <div className="upload-progress-container">
                        <div 
                            className="upload-progress-bar" 
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageUploader;