<?php
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

// CORS headers
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $groupId = $input['group_id'] ?? null;

    if (!$groupId) {
        throw new Exception("Group ID is required.");
    }

    $posts = $alumni->getGroupPosts($groupId);

    echo json_encode([
        'status' => 'success',
        'data' => $posts
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
