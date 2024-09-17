// Simulated loading of credentials from a CSV file
// Normally, this should be done server-side, but for demonstration, we simulate it here.
// Add this to your auth.js

function loadCredentialsFromCSV(callback) {
    // Path to your CSV file (could be a server URL)
    const csvFilePath = 'https://theskillfulnoob.github.io/mentee-restricted/cred/mentor-credentials.csv';  // Update this path

    // Use Papa Parse to parse the CSV file
    Papa.parse(csvFilePath, {
        download: true,
        header: true,  // This ensures that the CSV headers are used
        complete: function(results) {
            const credentials = results.data; // Store parsed CSV data as credentials array
            callback(credentials); // Call the callback to continue with login process
        },
        error: function(error) {
            console.error("Error loading CSV file:", error);
        }
    });
}

function menteeLogin() {
    var email = document.getElementById('mentee-email').value;
    var password = document.getElementById('mentee-password').value;

    // Load credentials from CSV before proceeding
    loadCredentialsFromCSV(function(credentials) {
        // Perform the authentication (check against the loaded list of users)
        const mentee = credentials.find(mentee => mentee.email === email && mentee.password === password);

        if (mentee) {
            // Save the login state
            localStorage.setItem('loggedIn', 'true');
            alert ("Login successfully");
            window.location.href = "mentee-restricted/index.html";
        } else {
            // Show an error message
            alert ("Login failed!");
            document.getElementById('login-message').textContent = 'Invalid email or password. Please try again.';
        }
    });
}



