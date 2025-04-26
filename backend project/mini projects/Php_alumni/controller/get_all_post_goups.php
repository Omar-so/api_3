<?php
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $groupId = $input['group_id'] ?? null;
    print_r($groupId);

    if (!$groupId) {
        throw new Exception("Group ID is required.");
    }

    $posts = $alumni->getGroupPosts($groupId);

    echo json_encode([
        'status' => 'success',
        'posts' => $posts
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
