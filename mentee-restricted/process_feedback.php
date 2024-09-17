<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $time = date("Y-m-d H:i:s");
    $csvFile = 'feedback.csv';

    // Save feedback to a CSV file
    $csvData = "$name,$email,$message,$time\n";
    file_put_contents($csvFile, $csvData, FILE_APPEND);

    if (file_exists($csvFile)) {
        $lines = file($csvFile);
        $feedbackCount = count($lines) - 1; //because the first line of the csv file is columns.
    } else {
        $feedbackCount = 0;
    }
    echo "Thank you for your feedback!\nTotal Feedback Messages: $feedbackCount";

} else {
    echo "Invalid request.";
}
?>