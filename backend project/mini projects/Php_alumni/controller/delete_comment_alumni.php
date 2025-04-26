<?php
session_start();
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

header('Content-Type: application/json');

try {
    if (!isset($_SESSION['alumni_id'])) {
        throw new Exception('You must be logged in to delete a comment.');
    }
    $input = json_decode(file_get_contents('php://input'), true);

    $alumniId = $_SESSION['alumni_id'];
    $commentId = $input['comment_id'] ?? null;

    if (!$commentId) {
        throw new Exception('Comment ID is required.');
    }

    $success = $alumni->deleteComment($alumniId, $commentId);

    if ($success) {
        echo json_encode(['status' => 'success', 'message' => 'Comment deleted successfully.']);
    } else {
        throw new Exception('You can only delete your own comment or it does not exist.');
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
