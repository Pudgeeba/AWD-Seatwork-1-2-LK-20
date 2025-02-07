document.addEventListener('DOMContentLoaded', function() {
    const brandFilter = document.getElementById('brandFilter');
    const seatsFilter = document.getElementById('seatsFilter');
    const transmissionFilter = document.getElementById('transmissionFilter');
    const filterBtn = document.getElementById('filterBtn');
    const carCards = document.querySelectorAll('.car-card');
    const rentCarButton = document.getElementById('rentCarButton');
    const carModal = document.getElementById('carModal');
    const modalCarName = document.getElementById('modalCarName');
    const modalCarImage = document.getElementById('modalCarImage');
    const modalCarDetails = document.getElementById('modalCarDetails');
    const closeModal = document.querySelector('.close');

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
                    selectedCar.querySelector('.select-car-btn').classList.remove('selected-button'); // Remove grey style
                }

                // Select the new car
                selectedCar = card;
                selectedCar.classList.add('selected');
                selectCarButton.innerText = 'Selected';
                selectCarButton.classList.add('selected-button'); // Add grey style

                // Update Rent Car button state
                updateRentCarButton();
            }
        });
    });

    // Rent car button functionality
    rentCarButton.addEventListener('click', function() {
        if (selectedCar) {
            // Get user information
            const userName = document.getElementById('user-name').value;
            const userPhone = document.getElementById('user-phone').value;
            const userEmail = document.getElementById('user-email').value;

            // Store selected car information in local storage
            const carBrand = selectedCar.getAttribute('data-brand');
            const carSeats = selectedCar.getAttribute('data-seats');
            const carTransmission = selectedCar.getAttribute('data-transmission');
            const carImage = selectedCar.querySelector('img').src;
            const carPrice = selectedCar.querySelector('p:nth-of-type(2)').innerText.split(': ')[1]; // Extract price

            // Store rental details
            const rentalDetails = {
                brand: carBrand,
                seats: carSeats,
                transmission: carTransmission,
                image: carImage,
                price: carPrice,
                user: {
                    name: userName,
                    phone: userPhone,
                    email: userEmail
                },
                status: 'available' // Initially available
            };

            // Save to local storage
            localStorage.setItem('selectedCar', JSON.stringify(rentalDetails));

            // Proceed to payment page
            window.location.href = '../paymentPage/index.html'; // Change to your payment page URL
        }
    });

    // Close modal functionality
    closeModal.addEventListener('click', function() {
        carModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === carModal) {
            carModal.style.display = 'none';
        }
    });
});