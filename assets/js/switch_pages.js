document.addEventListener('DOMContentLoaded', function() {
    // Data for passages
    // Fetch passages data from JSON file
    fetch('https://theskillfulnoob.github.io/assets/json/passages.json')
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
            pageImage.src = 'weekly-images/' + currentPassage.folder + '/page_' + currentPage + '.jpg';
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

        function updateDisplay() {        
            // Update the image source
            updateImage();
        
            // Update the page indicator and buttons
            updatePageIndicator(totalPages);
            updateButtons(totalPages);
        
            // Update passage title and include date
            updatePassageInfo(currentPassage);
        }
        
        function updatePassageInfo(passage) {
            // Update the passage title and date
            var passageTitle = document.getElementById('passage-title');
            passageTitle.textContent = passage.title + " | " + passage.date; // Include date
        }

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
                updateImage();
                updateButtons();
            }
        });

        // Event listener for 'Next' button
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updateImage();
                updateButtons();
            }
        });

        // Event listener for passage selection
        passageSelect.addEventListener('change', function() {
            currentPassageKey = this.value;
            currentPassage = passages[currentPassageKey];
            totalPages = currentPassage.totalPages;
            currentPage = 1; // Reset to first page
            updateDisplay();
        });


        
        // Call this function after passages are loaded
        populatePassageSelector();

        // Initialize the page
        updateImage();
        updateButtons();
        updatePassageInfo();
    })
    .catch(error => console.error('Error fetching passages:', error));
});

