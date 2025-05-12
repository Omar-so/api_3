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
        throw new Exception("You must be logged in to offer mentorship.");
    }

    $alumniId = $_SESSION['alumni_id'];
    $input = json_decode(file_get_contents("php://input"), true);

    $field = $input['field'] ?? null;
    $description = $input['description'] ?? null;

    if (!$field || !$description) {
        throw new Exception("Field and description are required.");
    }

    $alumni = new Alumni();
    $success = $alumni->offerMentorship($alumniId, $field, $description);

    if ($success) {
        echo json_encode(['status' => 'success', 'message' => 'Mentorship offered successfully.']);
    } else {
        throw new Exception("Failed to offer mentorship.");
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
