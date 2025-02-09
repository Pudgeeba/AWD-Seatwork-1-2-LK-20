document.addEventListener('DOMContentLoaded', function() {
    // Retrieve selected car information from local storage
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));

    if (selectedCar) {
        // Display the total price
        document.getElementById('totalPrice').innerText = `₱ ${selectedCar.price}`; // Show total price

        // Display user information
        const userInfo = selectedCar.user; // Assuming user info is stored in the selectedCar object
        document.getElementById('userNameValue').innerText = userInfo.name; // Show user name
        document.getElementById('userPhoneValue').innerText = userInfo.phone; // Show user phone
        document.getElementById('userEmailValue').innerText = userInfo.email; // Show user email
    }

    // Confirm payment button functionality
    document.getElementById('fullPaymentBtn').addEventListener('click', function() {
        showConfirmation('full');
    });

    document.getElementById('downPaymentBtn').addEventListener('click', function() {
        showConfirmation('down');
    });
});

function showConfirmation(type) {
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    const amountPaid = type === 'full' ? selectedCar.price : (selectedCar.price / 2); // Calculate amount to be paid

    // Set up confirmation popup
    document.getElementById('confirmationPopup').style.display = 'block';

    // Handle confirmation buttons
    document.getElementById('confirmYesBtn').onclick = function() {
        processPayment(type, amountPaid);
        closeConfirmation();
    };

    document.getElementById('confirmNoBtn').onclick = function() {
        closeConfirmation();
    };
}

function closeConfirmation() {
    document.getElementById('confirmationPopup').style.display = 'none';
}

function processPayment(type, amountPaid) {
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));

    // Update the receipt
    document.getElementById('receiptCarName').innerText = selectedCar.brand; // Show car name
    document.getElementById('receiptPaymentMethod').innerText = type === 'full' ? 'Full Payment' : '50% Down Payment'; // Show payment method
    document.getElementById('receiptAmount').innerText = `₱ ${amountPaid}`; // Show amount paid

    // Update the car status in local storage
    selectedCar.status = 'rented'; // Change status to rented
    localStorage.setItem('selectedCar', JSON.stringify(selectedCar));

    // Show the receipt popup
    document.getElementById('receiptPopup').style.display = 'block';
}

function closeReceipt() {
    document.getElementById('receiptPopup').style.display = 'none';
    localStorage.removeItem('selectedCar'); // Clear the selected car from local storage
    alert("Payment confirmed! Thank you for renting with us.");
    window.location.href = '../carsPage/index.html'; // Redirect to car selection page
}