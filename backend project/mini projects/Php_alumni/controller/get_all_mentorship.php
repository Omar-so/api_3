<?php
require_once(BASE_PATH . '/models/Alumni.php');
$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

header('Content-Type: application/json');
try {
    $alumni = new Alumni();
    $mentorships = $alumni->getAllMentorshipOffers();

    echo json_encode([
        'status' => 'success',
        'data' => $mentorships
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch mentorship offers.'
    ]);
}
