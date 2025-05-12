<?php
require_once(BASE_PATH . '/models/Alumni.php');

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($_SESSION['alumni_id'])) {
        http_response_code(401);
        echo json_encode(["status" => "error", "msg" => "Unauthorized"]);
        exit();
    }

    $alumniId = $_SESSION['alumni_id'];
    $storyId = $input['story_id'] ?? null;

    if (!$storyId) {
        http_response_code(400);
        echo json_encode(["status" => "error", "msg" => "Story ID is required."]);
        exit();
    }

    $alumni = new Alumni();

    try {
        $deleted = $alumni->deleteStory($storyId, $alumniId);
        if ($deleted) {
            http_response_code(200);
            echo json_encode(["status" => "success", "msg" => "Story deleted successfully"]);
        } else {
            http_response_code(403);
            echo json_encode(["status" => "error", "msg" => "Not authorized to delete this story or it doesn't exist"]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
