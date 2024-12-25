// Define a function to generate an image
async function generateImage() {
  try {
    // Get the text input
    const text = document.getElementById('text-input').value;

    // Make an API call to the Replicate API
    const response = await fetch('/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the generated image from the API response
    const imageData = await response.json();
    const imageUrl = imageData.output;

    // Display the generated image
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
    const image = document.createElement('img');
    image.src = imageUrl;
    imageContainer.appendChild(image);
  } catch (error) {
    console.error(error);
    alert('Error generating image: ' + error.message);
  }
}

// Add an event listener to the generate button
document.getElementById('generate-button').addEventListener('click', generateImage);
