document.addEventListener('DOMContentLoaded', function() {
    const brandFilter = document.getElementById('brandFilter');
    const seatsFilter = document.getElementById('seatsFilter');
    const transmissionFilter = document.getElementById('transmissionFilter');
    const filterBtn = document.getElementById('filterBtn');
    const carCards = document.querySelectorAll('.car-card');
    const rentCarButton = document.getElementById('rentCarButton');

    let selectedCar = null;

    // Enable or disable Rent Car button based on selected car
    function updateRentCarButton() {
        rentCarButton.disabled = selectedCar === null;
    }

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
        const selectCarButton = card.querySelector('.select-car-btn');
        selectCarButton.addEventListener('click', function() {
            const carStatus = card.getAttribute('data-status');

            if (carStatus === 'available') {
                // Deselect previously selected car
                if (selectedCar) {
                    selectedCar.classList.remove('selected');
                    selectedCar.querySelector('.select-car-btn').innerText = 'Select';
                }

                // Select the new car
                selectedCar = card;
                selectedCar.classList.add('selected');
                selectCarButton.innerText = 'Selected';

                // Update Rent Car button state
                updateRentCarButton();
            }
        });
    });

    // Rent car button functionality
    rentCarButton.addEventListener('click', function() {
        if (selectedCar) {
            // Store selected car information in local storage
            const carBrand = selectedCar.getAttribute('data-brand');
            const carSeats = selectedCar.getAttribute('data-seats');
            const carTransmission = selectedCar.getAttribute('data-transmission');
            const carImage = selectedCar.querySelector('img').src;
            const carPrice = selectedCar.querySelector('p:nth-of-type(2)').innerText.split('₱ ')[1]; // Extract price

            // Store rental details
            const rentalDetails = {
                brand: carBrand,
                seats: carSeats,
                transmission: carTransmission,
                image: carImage,
                price: carPrice,
                status: 'available' // Initially available
            };

            // Save to local storage
            localStorage.setItem('selectedCar', JSON.stringify(rentalDetails));
            console.log('Selected Car stored in local storage:', localStorage.getItem('selectedCar'));

            // Proceed to payment page
            window.location.href = '../paymentPage/index.html'; // Change to your payment page URL
        }
    });
});