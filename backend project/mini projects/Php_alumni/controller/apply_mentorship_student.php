<?php
require_once(BASE_PATH . '/models/student.php');
session_start();
$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

header('Content-Type: application/json');try {
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
