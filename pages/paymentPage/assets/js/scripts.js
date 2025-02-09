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
        document.getElementById('carPriceValue').innerText = selectedCar.price; // Show price
        document.getElementById('rentalDurationValue').innerText = `${selectedCar.duration} hours`; // Show rental duration
        document.getElementById('pickupLocationValue').innerText = pickupLocation; // Show pickup location
        document.getElementById('dropoffLocationValue').innerText = dropoffLocation; // Show dropoff location
        document.getElementById('pickupDateValue').innerText = pickupDate; // Show pickup date
        document.getElementById('dropoffDateValue').innerText = dropoffDate; // Show dropoff date
        document.getElementById('totalPriceValue').innerText = selectedCar.price * selectedCar.duration; // Show total price
    }

    // Display user information
    const userInfo = selectedCar.user; // Assuming user info is stored in the selectedCar object
    document.getElementById('userNameValue').innerText = userInfo.name; // Show user name
    document.getElementById('userPhoneValue').innerText = userInfo.phone; // Show user phone
    document.getElementById('userEmailValue').innerText = userInfo.email; // Show user email

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
    const rentalDuration = selectedCar.duration; // Assuming duration is in hours
    const amountPaid = type === 'full' ? selectedCar.price * rentalDuration : (selectedCar.price * rentalDuration) / 2;

    // Update the receipt
    document.getElementById('receiptCarName').innerText = selectedCar.brand;
    document.getElementById('receiptPaymentMethod').innerText = type === 'full' ? 'Full Payment' : '50% Down Payment';
    document.getElementById('receiptAmount').innerText = `₱ ${amountPaid}`;

    // Update the car status in local storage
    selectedCar.status = 'rented';
    localStorage.setItem('selectedCar', JSON.stringify(selectedCar));

    // Show the receipt popup
    document.getElementById('receiptPopup').style.display = 'block';

    // Change button color
    const fullPaymentBtn = document.getElementById('fullPaymentBtn');
    const downPaymentBtn = document.getElementById('downPaymentBtn');

    if (type === 'full') {
        fullPaymentBtn.classList.add('selected');
        downPaymentBtn.classList.remove('selected');
    } else {
        downPaymentBtn.classList.add('selected');
        fullPaymentBtn.classList.remove('selected');
    }
}

function closeReceipt() {
    document.getElementById('receiptPopup').style.display = 'none';
    localStorage.removeItem('selectedCar'); // Clear the selected car from local storage
    alert("Payment confirmed! Thank you for renting with us.");
    window.location.href = '../carsPage/index.html'; // Redirect to car selection page
}