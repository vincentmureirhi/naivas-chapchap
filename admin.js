document.getElementById('add-product-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;

    try {
        const response = await fetch('/.netlify/functions/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, code, price })
        });

        if (response.ok) {
            alert('Product added successfully');
        } else {
            const errorText = await response.text(); // Capture error details
            console.error('Failed to add product:', errorText);
            alert('Failed to add product');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred while adding the product.');
    }

    document.getElementById('add-product-form').reset();
});
