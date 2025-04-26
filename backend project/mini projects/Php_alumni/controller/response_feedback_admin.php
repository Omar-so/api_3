<?php
require_once(BASE_PATH . '/models/admin.php');
session_start();
header('Content-Type: application/json');

try {
    if (!isset($_SESSION['admin_id'])) {
        throw new Exception("Unauthorized access. Please log in.");
    }
    $input = json_decode(file_get_contents('php://input'), true);


    $adminId = $_SESSION['admin_id'];
    $feedbackId = $input['feedback_id'] ?? null;
    $responseContent = $input['response'] ?? null;

    if (!$feedbackId || !$responseContent || !$adminId) {
        throw new Exception("Missing feedback ID or response content.");
    }

    $admin = new Admin();
    $success = $admin->respondToFeedback($adminId, $feedbackId, $responseContent);

    echo json_encode([
        'status' => $success ? 'success' : 'error',
        'message' => $success ? 'Response submitted successfully.' : 'Failed to respond to feedback.'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
