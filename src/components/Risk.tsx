import { useState } from 'react'

function Risk() {
  const [risk, setRisk] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (files.length !== 3) {
      alert("Please choose the 3 files.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });
    
    try {
        const endpoint = "http://127.0.0.1:8000/predict";
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData
        });
        
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
            setRisk(data.risk.toString());
        } else {
            console.error("Error uploading file:", data);
        }
    } catch (error) {
        console.error("File upload failed:", error);
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          accept=".tsv"
          multiple
          onChange={handleFileInputChange}
        />
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <p>Risk: {risk}</p>
    </>
  )
}

export default Risk
