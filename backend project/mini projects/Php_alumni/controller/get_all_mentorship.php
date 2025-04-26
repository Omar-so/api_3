<?php
require_once(BASE_PATH . '/models/Alumni.php');
header('Content-Type: application/json');

try {
    $alumni = new Alumni();
    $mentorships = $alumni->getAllMentorshipOffers();

    echo json_encode([
        'status' => 'success',
        'data' => $mentorships
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch mentorship offers.'
    ]);
}
