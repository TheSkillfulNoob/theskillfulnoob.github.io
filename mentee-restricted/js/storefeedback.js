document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Perform client-side validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!message) {
        alert("Please fill in the message.");
        return;
    }

    // Submit the form to a PHP script for server-side processing
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    fetch("https://sflamad.student.ust.hk/QF-TestSite/process_feedback.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display a response message
        document.getElementById("feedback-form").reset(); // Clear the form
    })
    .catch(error => {
        console.error("Error:", error);
    });
});