<?php
session_start();
header(header: 'Content-Type: application/json');

require_once(BASE_PATH . '/models/Alumni.php');
$alumni = new Alumni();

if (!isset($_SESSION['alumni_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'You must be logged in.']);
    exit;
}
$input = json_decode(file_get_contents('php://input'), true);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $alumniId = $_SESSION['alumni_id']; // use from session
    $name = $input['name'];
    $type = $input['type'];

    if ($alumni->createGroup($alumniId, $name, $type)) {
        echo json_encode(['status' => 'success', 'message' => 'Group created.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create group.']);
    }
}
