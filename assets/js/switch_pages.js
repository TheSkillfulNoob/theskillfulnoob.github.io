document.addEventListener('DOMContentLoaded', function() {
    // Data for passages
    // Fetch passages data from JSON file
    fetch('https://theskillfulnoob.github.io/assets/json/passages.json')
    .then(response => response.json())
    .then(data => {
        var passages = data;
        // The rest of your code goes here, using the fetched passages
    })
    .catch(error => console.error('Error fetching passages:', error));

    // Initial passage
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

    // Update passage information
    function updatePassageInfo() {
        passageTitle.textContent = currentPassage.title;
        passageDescription.textContent = currentPassage.description;
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
        updateImage();
        updateButtons();
        updatePassageInfo();
    });

    // Initialize the page
    updateImage();
    updateButtons();
    updatePassageInfo();
});