function updateTotalVisitCount() {
    // Make a request to the PHP file to update and get the total visit count
    fetch('https://sflamad.student.ust.hk/v3/assets/php/visits-counter.php')
        .then(response => response.json())
        .then(data => {
            // Display the total visit count
            document.getElementById('total-visit-count').textContent = data.totalVisits;
        })
        .catch(error => {
            console.error('Error fetching the total visit count:', error);
        });
}

// Call the function when the page loads
window.onload = function() {
    updateTotalVisitCount(); // Total visit count across all users
};