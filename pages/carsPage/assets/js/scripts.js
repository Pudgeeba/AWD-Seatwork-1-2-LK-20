// JavaScript for filtering cars and handling car selection
document.addEventListener('DOMContentLoaded', function() {
    const brandFilter = document.getElementById('brandFilter');
    const seatsFilter = document.getElementById('seatsFilter');
    const transmissionFilter = document.getElementById('transmissionFilter');
    const filterBtn = document.getElementById('filterBtn');
    const carCards = document.querySelectorAll('.car-card');
    const carModal = document.getElementById('carModal');
    const modalCarName = document.getElementById('modalCarName');
    const modalCarImage = document.getElementById('modalCarImage');
    const modalCarDetails = document.getElementById('modalCarDetails');
    const rentCarBtn = document.getElementById('rentCarBtn');
    const selectedCarInput = document.getElementById('selectedCar');
    const closeModal = document.querySelector('.close');

    let selectedCar = null;

    filterBtn.addEventListener('click', function() {
        const selectedBrand = brandFilter.value;
        const selectedSeats = seatsFilter.value;
        const selectedTransmission = transmissionFilter.value;

        carCards.forEach(card => {
            const brand = card.getAttribute('data-brand');
            const seats = card.getAttribute('data-seats');
            const transmission = card.getAttribute('data-transmission');

            const matchesBrand = selectedBrand === 'all' || brand === selectedBrand;
            const matchesSeats = selectedSeats === 'all' || seats === selectedSeats;
            const matchesTransmission = selectedTransmission === 'all' || transmission === selectedTransmission;

            if (matchesBrand && matchesSeats && matchesTransmission) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    carCards.forEach(card => {
        const viewCarButton = card.querySelector('button');
        viewCarButton.addEventListener('click', function() {
            const carName = card.querySelector('h2').innerText;
            const carImage = card.querySelector('img').src;
            const carDetails = `Brand: ${card.getAttribute('data-brand')}<br>Seats: ${card.getAttribute('data-seats')}<br>Transmission: ${card.getAttribute('data-transmission')}<br>Rental Status: Available`;

            modalCarName.innerText = carName;
            modalCarImage.src = carImage;
            modalCarDetails.innerHTML = carDetails;

            selectedCar = card; // Store the selected car
            selectedCarInput.value = carName; // Store selected car name

            // Show the modal
            carModal.style.display = 'block';
        });
    });

    // Close modal functionality
    closeModal.addEventListener('click', function() {
        carModal.style.display = 'none';
    });

    // Rent car button functionality
    rentCarBtn.addEventListener('click', function() {
        if (selectedCar) {
            // Proceed to payment page
            window.location.href = 'paymentPage.html'; // Change to your payment page URL
        }
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === carModal) {
            carModal.style.display = 'none';
        }
    });
});