document.addEventListener('DOMContentLoaded', function() {
    const selectedCar = document.getElementById('selectedCar').value;
    const pickupDate = new URLSearchParams(window.location.search).get('pickup-date');
    const dropoffDate = new URLSearchParams(window.location.search).get('dropoff-date');

    document.getElementById('carReceipt').innerText = `Selected Car: ${selectedCar}\nPick-up Date: ${pickupDate}\nDrop-off Date: ${dropoffDate}`;
});