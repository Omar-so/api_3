<?php
require_once(BASE_PATH . '/models/student.php');

header('Content-Type: application/json');

try {
    $student = new Student();

    $input = json_decode(file_get_contents('php://input'), true);
    $studentId = $input['student_id'] ?? null;

    if (!$studentId) {
        echo json_encode(["status" => 400, "msg" => "student_id is required"]);
        exit;
    }

    $Student_object = $student->getById($studentId);

    if (!$Student_object) {
        echo json_encode(["status" => 300, "msg" => "There is no student with this ID"]);
        exit;
    }

    echo json_encode([
        "status" => 201,
        "msg" => "Created",
        "data" => $Student_object
    ]);

} catch (\Throwable $th) {
    echo json_encode([
        "status" => 500,
        "msg" => "An error occurred",
        "error" => $th->getMessage()
    ]);
}
