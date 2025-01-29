import { createRef } from "react";
import { use } from "react";
import { useState } from "react"

// print range to be added

function Filein(){


    const [file,setFile]=useState(null);
    const [status,setStatus]=useState('idle ')
    const uploadRef=createRef(null);
    const inputRef=createRef(null);

    const [prefer,setPrefer]=useState({
        orientation: "portrait",
        paperSize: "A4",
        printRange: "all",
        copies: 1,
    })



    const handleChange=(event)=>{
            if(event.target.files){
                setFile(event.target.files[0])
                
                console.log(inputRef.current.value);
                uploadRef.current.disabled=false;
            }

    }
        return(
            <>
            <div className="printContainer"> 



                <div className="fileInputContainer">
                        <h2>Upload your file</h2>
                        <input type="file" id="fileInput" style={{display:'none'}} onChange={handleChange}/>
                        {file?(<p>{file.name}</p>):(<label htmlFor="fileInput"  className="fileInput">Choose Your File</label>)}
                        {file && (<label htmlFor="fileInput"  className="fileInput">Change file</label>)}
                        <button type="button" className="fileupload" ref={uploadRef} disabled>upload</button>
                </div>

                <div className="printPreferences">
                    <h2>Print Preferences</h2>
                    <label for="orientation">Orientation:</label>
                        <select id="orientation">
                            <option value="1">Potrait</option>
                            <option value="2">Landscape</option>
                        </select>

                        <label for="paperSize">Orientation:</label>
                        <select id="orientation">
                            <option value="1">A4</option>
                            <option value="2">Letter</option>
                        </select>
                         
                        <label for="numCopies">Number of Copies:</label>
                        <select id="numCopies">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        
                </div>
            </div>
            </>
        )


}


export default Filein