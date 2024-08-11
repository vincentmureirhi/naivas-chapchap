document.getElementById('add-product-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;

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
        alert('Failed to add product');
    }

    document.getElementById('add-product-form').reset();
});
