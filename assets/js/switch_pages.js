document.addEventListener('DOMContentLoaded', function() {
    var passages = {};
    var currentPassageKey = null;
    var totalPages = 0;
    var currentPage = 1;

    // Get references to elements
    var pageImage = document.getElementById('page-image');
    var pdfViewer = document.getElementById('pdf-viewer'); // Add a container for PDF viewer
    var prevButton = document.getElementById('previous');
    var nextButton = document.getElementById('next');
    var passageSelect = document.getElementById('passage-select');
    var passageTitle = document.getElementById('passage-title');
    var passageDescription = document.getElementById('passage-description');
    var pageIndicator = document.getElementById('page-indicator');
    var yearSelect = document.getElementById('year-select'); // Dropdown for year selection

    function fetchPassages(year) {
        fetch(`https://theskillfulnoob.github.io/assets/json/year${year}_passages.json`)
        .then(response => response.json())
        .then(data => {
            passages = data;
            currentPassageKey = Object.keys(passages)[0]; // Set default passage to the first one
            currentPassage = passages[currentPassageKey];
            totalPages = currentPassage.totalPages;
            currentPage = 1; // Reset to first page

            populatePassageSelector();
            updateDisplay();
        })
        .catch(error => console.error('Error fetching passages:', error));
    }

    // Function to extract year from the HTML file name
    function getYearFromFileName() {
        var path = window.location.pathname; // Get the current path
        var fileName = path.substring(path.lastIndexOf('/') + 1); // Extract the file name
        var yearMatch = fileName.match(/year(\d)/); // Match the year pattern (e.g., year1, year2, etc.)
        return yearMatch ? yearMatch[1] : null; // Return the year or null if not found
    }

    // Function to update the display based on current passage and format
    function updateDisplay() {        
        if (yearSelect.value === '4') {
            // Year 4 - Display images
            updateImageDisplay();
        } else {
            // Year 1, 2, 3 - Display PDFs
            updatePdfDisplay();
        }

        // Update passage title and description, including date
        updatePassageInfo(currentPassage);
    }

    // Update passage information including title, date, and description
    function updatePassageInfo(passage) {
        passageTitle.textContent = passage.title + " | " + passage.date; // Include date
        passageDescription.textContent = passage.description; // Update description
    }

    // Update image display
    function updateImageDisplay() {
        pageImage.src = 'weekly-doc/year' + yearSelect.value + '/' + currentPassage.folder + '/page_' + currentPage + '.jpg';
        pageImage.alt = 'Page ' + currentPage;
        pageIndicator.textContent = 'Page ' + currentPage + ' of ' + totalPages;

        // Hide PDF viewer
        pdfViewer.style.display = 'none';
        // Show image
        pageImage.style.display = 'block';
    }

    // Update PDF display
    function updatePdfDisplay() {
        // Assuming you have a PDF viewer set up to display the PDF
        var pdfPath = 'weekly-doc/year' + yearSelect.value + '/' + currentPassage.folder + '.pdf';
        pdfViewer.src = pdfPath; // Set the PDF source
        pdfViewer.style.display = 'block'; // Show PDF viewer
        pageImage.style.display = 'none'; // Hide image

        // Update page indicator (if applicable)
        pageIndicator.textContent = 'Viewing PDF for: ' + currentPassage.title;
    }

    // Populate the passage selector with options
    function populatePassageSelector() {
        passageSelect.innerHTML = ''; // Clear previous options
        for (var key in passages) {
            if (passages.hasOwnProperty(key)) {
                var option = document.createElement('option');
                option.value = key;
                option.textContent = passages[key].title;
                passageSelect.appendChild(option);
            }
        }
        // Set the default selected passage
        passageSelect.value = currentPassageKey;
    }

    // Event listener for year selection
    yearSelect.addEventListener('change', function() {
        var selectedYear = this.value;
        fetchPassages(selectedYear); // Fetch passages for the selected year
    });

    // Event listener for 'Previous' button
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateDisplay(); // Update display to reflect changes
        }
    });

    // Event listener for 'Next' button
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay(); // Update display to reflect changes
        }
    });

    // Event listener for passage selection
    passageSelect.addEventListener('change', function() {
        currentPassageKey = this.value;
        currentPassage = passages[currentPassageKey];
        totalPages = currentPassage.totalPages;
        currentPage = 1; // Reset to first page
        updateDisplay(); // Update display with new passage
    });

    // Call this function after passages are loaded
    var currentYear = getYearFromFileName(); // Get the current year dynamically
    if (currentYear) {
        fetchPassages(currentYear); // Fetch passages for the extracted year
    } else {
        console.error('Year not found in file name');
    }
});
