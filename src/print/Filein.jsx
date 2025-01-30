import { createRef } from "react";
import { useState } from "react";
import "./filein.css";

function Filein() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const uploadRef = createRef(null);
  const inputRef = createRef(null);

  const [prefer, setPrefer] = useState({
    orientation: "portrait",
    paperSize: "A4",
    printRange: "all",
    copies: 1,
  });

  const handleChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      uploadRef.current.disabled = false;
    }
  };

  return (
    <>
      <div className="printContainer">
        <div className="fileInputContainer">
          <h2>Upload Your File</h2>

          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleChange} />

                {file ? (<p>{file.name}</p>):(<label htmlFor="fileInput" className="fileInput">Choose Your File</label>)}
                {file && <label htmlFor="fileInput" className="fileInput">Change File</label>}
          <button type="button" className="fileupload" ref={uploadRef} disabled>Upload</button>

        </div>

        <div className="printPreferences">
          <h2>Print Preferences</h2>

          <label htmlFor="orientation">Orientation:</label>
          <select id="orientation">
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>

          <label htmlFor="paperSize">Paper Size:</label>
          <select id="paperSize">
            <option value="A4">A4</option>
            <option value="letter">Letter</option>
          </select>

          <label htmlFor="numCopies">Number of Copies:</label>
          <select id="numCopies">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <label htmlFor="printRange">Print Range:</label>
          <select id="printRange">
            <option value="all">All Pages</option>
            <option value="selected">Selected Pages</option>
            <option value="range">Page Range</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Filein;
