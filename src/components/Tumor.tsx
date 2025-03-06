import { useState } from 'react'

function Tumor() {
  type TumorType = '' | 'Meningioma' | 'Glioma' | 'Pituitary' | 'No Tumor';
  type ScanType = '' | 'MRI' | 'XRay';
  const [tumortype, setTumorType] = useState<TumorType>('');
  const [scantype, setScanType] = useState<ScanType>('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (files.length !== 1) {
      alert("Please choose the file.");
      return;
    }

    if (scantype === '') {
      alert("Please choose the scan type.");
      return
    }

    const file = files[0];
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData);
    
    try {
        const endpoint = `http://127.0.0.1:8000/${scantype.toLowerCase()}`;
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData
        });
        
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
            setTumorType(data.TumorType.toString());
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
        <select value={scantype} onChange={(e) => setScanType(e.target.value as ScanType)}>
          <option value="">Select Scan Type</option>
          <option value="MRI">MRI</option>
          <option value="XRay">X-Ray</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <p>Tumor Type: {tumortype}</p>
    </>
  )
}

export default Tumor
