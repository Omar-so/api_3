<?php
session_start();
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

header('Content-Type: application/json');

try {
    if (!isset($_SESSION['alumni_id'])) {
        throw new Exception('You must be logged in to exit a group.');
    } 
    $input = json_decode(file_get_contents('php://input'), true);


    $alumniId = $_SESSION['alumni_id'];
    $groupId = $input['group_id'] ?? null;

    if (!$groupId) {
        throw new Exception('Group ID is required.');
    }

    $exited = $alumni->exitGroup($alumniId, $groupId);

    if ($exited) {
        echo json_encode([
            'status' => 'success',
            'message' => 'You have successfully exited the group.'
        ]);
    } else {
        echo json_encode([
            'status' => 'info',
            'message' => 'You are not a member of this group.'
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
