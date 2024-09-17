// assets/js/loadHTML.js
function loadHTML(file, elementId) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(err => console.error('Failed to load HTML file: ', err));
  }
  
  // Automatically load the header and nav when the page loads
  document.addEventListener("DOMContentLoaded", function() {
    loadHTML('https://sflamad.student.ust.hk/v3/header.html', 'header-container');  // Adjust path as needed
    loadHTML('https://sflamad.student.ust.hk/v3/nav.html', 'nav-container');        // Adjust path as needed
  });
  