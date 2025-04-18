import React, { useState } from 'react';

export default function PrintUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a PDF file.');
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      const res = await fetch('/api/print/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setMessage('File uploaded for printing!');
        setFile(null);
      } else {
        setMessage('Upload failed.');
      }
    } catch (err) {
      setMessage('Error uploading file.');
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{margin: '2rem auto', maxWidth: 400, padding: 20, border: '1px solid #eee', borderRadius: 8}}>
      <h2>Upload PDF for Printing</h2>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <button type="submit" disabled={uploading} style={{marginLeft: 8}}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <div style={{marginTop: 10}}>{message}</div>}
    </form>
  );
}
