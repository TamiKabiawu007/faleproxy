document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fetch-form');
  const urlInput = document.getElementById('url-input');
  const resultContainer = document.getElementById('result-container');
  const loadingIndicator = document.getElementById('loading-indicator');
  const errorMessage = document.getElementById('error-message');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = urlInput.value.trim();
    
    if (!url) {
      showError('Please enter a URL');
      return;
    }
    
    // Show loading indicator
    loadingIndicator.style.display = 'block';
    resultContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    
    try {
      const response = await fetch('/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch content');
      }
      
      const data = await response.json();
      
      // Display the result
      resultContainer.innerHTML = `
        <h2>Title: ${data.title}</h2>
        <div class="content-frame">
          ${data.content}
        </div>
        <p class="original-url">Original URL: <a href="${data.originalUrl}" target="_blank">${data.originalUrl}</a></p>
      `;
      
      resultContainer.style.display = 'block';
    } catch (error) {
      showError(error.message);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  });
  
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    resultContainer.style.display = 'none';
  }
});
