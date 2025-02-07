document.addEventListener('DOMContentLoaded', function() {
    // Retrieve selected car information from local storage
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    const pickupDate = new URLSearchParams(window.location.search).get('pickup-date');
    const dropoffDate = new URLSearchParams(window.location.search).get('dropoff-date');
    const pickupLocation = new URLSearchParams(window.location.search).get('pickup-location');
    const dropoffLocation = new URLSearchParams(window.location.search).get('dropoff-location');

    if (selectedCar) {
        // Display car details
        document.getElementById('carName').innerText = selectedCar.brand;
        document.getElementById('carImage').src = selectedCar.image || 'car-placeholder.jpg'; // Use a placeholder if no image is provided
        document.getElementById('carPrice').innerText = `Price per hour: Rs. ${selectedCar.price}`;
        document.getElementById('rentalDuration').innerText = `Rental Duration: ${selectedCar.duration} hours`;
        document.getElementById('pickupLocation').innerText = `Pick-up Location: ${pickupLocation}`;
        document.getElementById('dropoffLocation').innerText = `Drop-off Location: ${dropoffLocation}`;
        document.getElementById('pickupDate').innerText = `Pick-up Date: ${pickupDate}`;
        document.getElementById('dropoffDate').innerText = `Drop-off Date: ${dropoffDate}`;
        document.getElementById('totalPrice').innerText = `Total Price: Rs. ${selectedCar.totalPrice}`;
    }

    // Display user information
    const userInfo = selectedCar.user; // Assuming user info is stored in the selectedCar object
    document.getElementById('userName').innerText = `Name: ${userInfo.name}`;
    document.getElementById('userPhone').innerText = `Phone: ${userInfo.phone}`;
    document.getElementById('userEmail').innerText = `Email: ${userInfo.email}`;

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
    const amountPaid = type === 'full' ? selectedCar.totalPrice : selectedCar.totalPrice / 2;

    // Update the receipt
    document.getElementById('receiptCarName').innerText = selectedCar.brand;
    document.getElementById('receiptPaymentMethod').innerText = type === 'full' ? 'Full Payment' : '50% Down Payment';
    document.getElementById('receiptAmount').innerText = `Rs. ${amountPaid}`;

    // Update the car status in local storage
    selectedCar.status = 'rented';
    localStorage.setItem('selectedCar', JSON.stringify(selectedCar));

    // Show the receipt popup
    document.getElementById('receiptPopup').style.display = 'block';
}

function closeReceipt() {
    document.getElementById('receiptPopup').style.display = 'none';
    // Optionally redirect to the car selection page
    window.location.href = '../carsPage/index.html'; // Redirect to car selection page
}