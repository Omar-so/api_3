<?php
session_start();
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}


try {
    if (!isset($_SESSION['alumni_id'])) {
        throw new Exception('You must be logged in to join a group.');
    }
    $input = json_decode(file_get_contents('php://input'), true);


    $alumniId = $_SESSION['alumni_id'];
    $groupId = $input['group_id'];

    if (!$groupId) {
        throw new Exception('Group ID is required.');
    }

    $joined = $alumni->participateInGroup($alumniId, $groupId);

    if ($joined) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Successfully joined the group.'
        ]);
    } else {
        echo json_encode([
            'status' => 'info',
            'message' => 'You are already a member of this group.'
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
