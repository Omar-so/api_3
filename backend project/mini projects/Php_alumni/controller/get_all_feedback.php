<?php
require_once(BASE_PATH . '/models/Alumni.php');

header('Content-Type: application/json');

try {
    $Alumni = new Alumni();
    $allFeedback = $Alumni->getAllFeedback();

    echo json_encode([
        "status" => 200,
        "msg" => "All feedback retrieved successfully.",
        "data" => $allFeedback
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "status" => 500,
        "msg" => "An error occurred while retrieving feedback.",
        "error" => $e->getMessage()
    ]);
}
