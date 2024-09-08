// Get the form element
const form = document.getElementById('add-product-form');

// Add an event listener to handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the form from submitting the default way

  // Get the values from the form inputs
  const name = document.getElementById('name').value;
  const code = document.getElementById('code').value;
  const price = document.getElementById('price').value;

  // Create a product object
  const product = {
    name: name,
    code: code,
    price: price
  };

  // Send a POST request to the backend API to add the product
  fetch('https://your-backend-url.onrender.com/api/add-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify(product) // Convert product object to JSON string
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    return response.text(); // Convert response to text
  })
  .then(data => {
    // Handle success - Show a success message
    alert('Product added successfully: ' + data);
    // Optionally, you can reset the form
    form.reset();
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
    alert('Failed to add product: ' + error.message);
  });
});
