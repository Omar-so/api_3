<?php
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

// CORS Headers
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $postId = $input['post_id'] ?? null;

    if (!$postId) {
        throw new Exception('Post ID is required.');
    }

    $comments = $alumni->getComments($postId);

    echo json_encode([
        'status' => 'success',
        'data' => $comments
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
