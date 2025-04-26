<?php
session_start();
require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

header('Content-Type: application/json');
try {
    if (!isset($_SESSION['alumni_id'])) {
        throw new Exception('You must be logged in to join a group.');
    }
    header(header: 'Content-Type: application/json');


    $alumniId = $_SESSION['alumni_id'];
    $groupId = $input['group_id'] ?? null;

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
