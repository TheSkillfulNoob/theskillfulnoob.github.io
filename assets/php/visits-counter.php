<?php
// Path to the file where the total visit count is stored
$counterFile = 'visits.txt';

// Check if the file exists
if (!file_exists($counterFile)) {
    // If the file doesn't exist, create it and initialize the count to 0
    file_put_contents($counterFile, '1');
}

// Read the current count from the file
$currentCount = (int)file_get_contents($counterFile);

// Increment the count
$newCount = $currentCount + 1;

// Write the new count back to the file
file_put_contents($counterFile, $newCount);

// Return the updated count as a JSON response
echo json_encode(['totalVisits' => $newCount]);
?>