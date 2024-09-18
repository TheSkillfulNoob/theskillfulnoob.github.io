document.addEventListener('DOMContentLoaded', function() {
    // Fetch passages data from JSON file
    fetch('https://theskillfulnoob.github.io/assets/json/year4_passages.json')
    .then(response => response.json())
    .then(data => {
        var passages = data;
        var currentPassageKey = '73-regularization';
        var currentPassage = passages[currentPassageKey];
        var totalPages = currentPassage.totalPages;
        var currentPage = 1;

        // Get references to elements
        var pageImage = document.getElementById('page-image');
        var prevButton = document.getElementById('previous');
        var nextButton = document.getElementById('next');
        var passageSelect = document.getElementById('passage-select');
        var passageTitle = document.getElementById('passage-title');
        var passageDescription = document.getElementById('passage-description');
        var pageIndicator = document.getElementById('page-indicator');

        // Update the image source based on the current page and passage
        function updateImage() {
            pageImage.src = 'weekly-doc/year4/' + currentPassage.folder + '/page_' + currentPage + '.jpg';
            pageImage.alt = 'Page ' + currentPage;
            updatePageIndicator();
        }

        // Disable or enable buttons based on current page
        function updateButtons() {
            prevButton.disabled = (currentPage === 1);
            nextButton.disabled = (currentPage === totalPages);
        }

        // Update page indicator
        function updatePageIndicator() {
            pageIndicator.textContent = 'Page ' + currentPage + ' of ' + totalPages;
        }

        // Update the display of image, title, and description
        function updateDisplay() {        
            // Update the image source
            updateImage();

            // Update the page indicator and buttons
            updatePageIndicator();
            updateButtons();
        
            // Update passage title and description, including date
            updatePassageInfo(currentPassage);
        }
        
        // Update passage information including title, date, and description
        function updatePassageInfo(passage) {
            passageTitle.textContent = passage.title + " | " + passage.date; // Include date
            passageDescription.textContent = passage.description; // Update description
        }

        // Populate the passage selector with options
        function populatePassageSelector() {
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
        populatePassageSelector();

        // Initialize the page
        updateDisplay(); // Initialize display to show the default passage
    })
    .catch(error => console.error('Error fetching passages:', error));
});
