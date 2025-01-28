import './Chat.css'

function Chat() {
  document.getElementById('upload-button')?.addEventListener('click', async () => {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    const resultDiv = document.getElementById('classification-result');

    if(resultDiv){
      resultDiv.style.display = 'none';
      resultDiv.textContent = '';

      if (!fileInput?.files?.length) {
          alert('Please select an image to upload!');
          return;
      }

      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('image', file);
      console.log(formData);

      try {
          resultDiv.style.display = 'block';
          resultDiv.textContent = 'Processing...';

          const response = await fetch('http://127.0.0.1:8000/process_image', {
              method: 'POST',
              body: formData
          });

          if (!response.ok) {
              throw new Error('Failed to process image. Please try again.');
          }

          const data = await response.json();

          resultDiv.textContent = `Classification: ${data.classification}`;
          resultDiv.style.backgroundColor = '#e0f7e0';
          resultDiv.style.borderColor = '#5cb85c';
      } catch (error: Error | any) {
          console.error('Error:', error);
          resultDiv.textContent = `Error: ${error.message}`;
          resultDiv.style.backgroundColor = '#f8d7da';
          resultDiv.style.borderColor = '#f5c6cb';
      }
    }
  });


  return (
    <div>
      <h1>Waste Classification</h1>
      <p>Upload an image of waste to classify it into categories such as plastic, paper, organic, metal, or other.</p>
      <input type="file" id="image-upload" accept="image/*"/>
      <br />
      <button id="upload-button">Classify Waste</button>
      <div id="classification-result"></div>
    </div>
  )
}

export default Chat;