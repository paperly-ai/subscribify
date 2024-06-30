export const handleFileUpload = (file: File) => {
  console.log('Selected file:', file);
  const formData = new FormData();
  formData.append('pdf', file);

  fetch('http://localhost:8080/api/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Upload successful:', data);
    })
    .catch(error => {
      console.error('Upload error:', error);
    });
};
