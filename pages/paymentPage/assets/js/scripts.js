document.addEventListener('DOMContentLoaded', function() {
    // Retrieve selected car information from local storage
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));

    if (selectedCar) {
        // Display the total price
        document.getElementById('totalPrice').innerText = `₱ ${selectedCar.price}`; // Show total price
    }

    // Confirm payment button functionality
    document.getElementById('fullPaymentBtn').addEventListener('click', function() {
        processPayment('full');
    });

    document.getElementById('downPaymentBtn').addEventListener('click', function() {
        processPayment('down');
    });
});

function processPayment(type) {
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    const amountPaid = type === 'full' ? selectedCar.price : (selectedCar.price / 2); // Calculate amount to be paid

    // Update the receipt
    document.getElementById('receiptCarName').innerText = selectedCar.brand; // Show car name
    document.getElementById('receiptPaymentMethod').innerText = type === 'full' ? 'Full Payment' : '50% Down Payment'; // Show payment method
    document.getElementById('receiptAmount').innerText = `₱ ${amountPaid}`; // Show amount paid

    // Update the car status in local storage
    selectedCar.status = 'Rented Out'; // Change status to rented out
    localStorage.setItem('selectedCar', JSON.stringify(selectedCar));

    // Show the receipt popup
    document.getElementById('receiptPopup').style.display = 'block';
}

function closeReceipt() {
    document.getElementById('receiptPopup').style.display = 'none';
    alert("Payment confirmed! Thank you for renting with us.");
    window.location.href = '../carsPage/index.html'; // Redirect to car selection page
}