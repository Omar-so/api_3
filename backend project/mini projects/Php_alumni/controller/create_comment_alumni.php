<?php
session_start();
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

header('Content-Type: application/json');

try {
    if (!isset($_SESSION['alumni_id'])) {
        throw new Exception('You must be logged in to post a comment.');
    }
    $input = json_decode(file_get_contents('php://input'), true);

    $alumniId = $_SESSION['alumni_id'];
    $postId = $input['post_id'] ?? null;
    $content = $input['content'] ?? null;

    if (!$postId || !$content) {
        throw new Exception('Post ID and comment content are required.');
    }

    $success = $alumni->createComment($alumniId, $postId, $content);

    if ($success) {
        echo json_encode(['status' => 'success', 'message' => 'Comment posted successfully.']);
    } else {
        throw new Exception('Failed to post comment.');
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
