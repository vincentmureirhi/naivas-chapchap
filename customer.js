function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 0);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function() {
    var myqr = document.getElementById('you-qr-results');
    var totalElement = document.getElementById('total');
    var total = 0;
    var lastResult, countResults = 0;

    async function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            ++countResults;
            lastResult = decodeText;

            const response = await fetch('http://localhost:3000/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ qrData: decodeText })
            });

            if (response.ok) {
                const product = await response.json();
                total += product.price;
                totalElement.innerText = total;

                var resultElement = document.createElement('div');
                resultElement.innerText = `You scanned ${countResults}: ${product.name} - ${product.price} KSH`;
                myqr.insertBefore(resultElement, myqr.firstChild);
            } else {
                alert("Product not found");
            }
        }
    }

    var htmlScanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbox: 250 });
    htmlScanner.render(onScanSuccess);
});

function payNow() {
    alert('Please wait for M-PESA pin prompt');
    setTimeout(() => {
        const total = document.getElementById('total').innerText;
        const naivasPin = prompt(`Pay ${total} KSH to NAIVAS! Enter your NAIVAS pin:`);
        if (naivasPin) {
            alert('Payment successful');
        } else {
            alert('Payment cancelled');
        }
    }, 1000);
}

function generateReceipt() {
    const total = document.getElementById('total').innerText;
    const date = new Date();
    const receipt = `Receipt\nDate: ${date.toLocaleDateString()}\nTime: ${date.toLocaleTimeString()}\nTotal: ${total} KSH\nVAT: ${(total * 0.16).toFixed(2)} KSH\nGrand Total: ${(total * 1.16).toFixed(2)} KSH\nThank you for shopping at NAIVAS CHAP!CHAP!`;
    alert(receipt);
}
