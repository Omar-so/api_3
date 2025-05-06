<?php
require_once(BASE_PATH . '/models/Alumni.php');
session_start();
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
    if (!isset($_SESSION['alumni_id'])) {
        throw new Exception("Unauthorized access. Please log in.");
    }
    $input = json_decode(file_get_contents('php://input'), true);


    $alumniId = $_SESSION['alumni_id'];
    $content = $input['content'] ?? null;

    if ( !$content) {
        throw new Exception("Missing fields.");
    }

    $alumni = new Alumni();
    $success = $alumni->submitFeedback($alumniId,$content);

    echo json_encode([
        'status' => $success ? 'success' : 'error',
        'message' => $success ? 'Feedback submitted successfully.' : 'Failed to submit feedback.'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
