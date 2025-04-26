<?php
require_once(BASE_PATH . '/models/Alumni.php');

header('Content-Type: application/json');

try {
    $alumni = new Alumni();

    $input = json_decode(file_get_contents('php://input'), true);
    $alumniId = $input['alumni_id'] ?? null;

    if (!$alumniId) {
        echo json_encode(["status" => 400, "msg" => "alumni_id is required"]);
        exit;
    }

    $alumniData = $alumni->getById($alumniId);

    if (!$alumniData) {
        echo json_encode(["status" => 300, "msg" => "There is no alumni with this ID"]);
        exit;
    }

    echo json_encode([
        "status" => 201,
        "msg" => "Created",
        "data" => $alumniData
    ]);

} catch (\Throwable $th) {
    echo json_encode([
        "status" => 500,
        "msg" => "An error occurred",
        "error" => $th->getMessage()
    ]);
}
