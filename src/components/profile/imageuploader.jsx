
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { useEffect, useState } from 'react';


function ImageUploader({user,setUser}){

const [url,setUrl]=useState(user.url)
const [imageKey, setImageKey] = useState(Date.now());

const authenticator =  async () => {
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
  };
  
const onSuccess = async(res) => {
    console.log("Success", res);
    console.log(res.filePath);
    try {
        const response = await fetch(`/api/student/upload/${user.userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url:res.filePath })
        });
        const data=await response.json()
        console.log(data)
        setUrl(data.url)
        setImageKey(Date.now());
    }catch (error) {
        console.log("❌ Error uploading image",error);
    }
}

useEffect(()=>{
    sessionStorage.setItem('userInfo', JSON.stringify(user));
},[url])

useEffect(() => {
    if (user?.url) { // Add a check to ensure user and user.url exist
      setUrl(user.url);
    }
  }, [user?.url]);



    return(
        <>
        <IKContext publicKey={import.meta.env.VITE_PUBLIC_PUBLIC_KEY} urlEndpoint={import.meta.env.VITE_PUBLIC_URL_ENDPOINT} authenticator={authenticator} >
            <IKImage   key={imageKey} path={url} urlEndpoint={import.meta.env.VITE_PUBLIC_URL_ENDPOINT} onError={(e) => (e.target.src = "https://placehold.co/100")} />
            <IKUpload  useUniqueFileName={true} onError={onError} onSuccess={onSuccess} folder={"/images"}/>
        </IKContext>
        </>


    )



}

export default ImageUploader;