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
$alumni = new Alumni();

if (!isset($_SESSION['alumni_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'You must be logged in.']);
    exit;
}
$input = json_decode(file_get_contents('php://input'), true);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $alumniId = $_SESSION['alumni_id']; // use from session
    $name = $input['name'];
    $type = $input['type'];

    if ($alumni->createGroup($alumniId, $name, $type)) {
        echo json_encode(['status' => 'success', 'message' => 'Group created.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create group.']);
    }
}
