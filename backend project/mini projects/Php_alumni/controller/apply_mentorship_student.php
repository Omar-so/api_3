<?php
require_once(BASE_PATH . '/models/student.php');
session_start();
header('Content-Type: application/json');

try {
    if (!isset($_SESSION['student_id'])) {
        throw new Exception("Unauthorized: Please login.");
    }
    $input = json_decode(file_get_contents('php://input'), true);

    $studentId = $_SESSION['student_id'];
    $mentorshipId = $input['mentorship_id'] ?? null;

    if (!$mentorshipId) {
        throw new Exception("Mentorship ID is required.");
    }

    $student = new Student();
    $applied = $student->applyForMentorship($studentId, $mentorshipId);

    if ($applied) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Successfully applied for mentorship.'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to apply. Maybe already applied?'
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
