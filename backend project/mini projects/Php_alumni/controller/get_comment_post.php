<?php
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

header(header: 'Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $postId = $input['post_id'] ?? null;
    print_r($postId);

    if (!$postId) {
        throw new Exception('Post ID is required.');
    }

    $comments = $alumni->getComments($postId);

    echo json_encode([
        'status' => 'success',
        'comments' => $comments
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
