<?php
require_once(BASE_PATH . '/models/Alumni.php');

header('Content-Type: application/json');
session_start();

try {
    if (!isset($_SESSION['alumni_id'])) {
        echo json_encode(["status" => 401, "msg" => "You need to login"]);
        exit;
    }

    $alumni = new Alumni();

    $input = json_decode(file_get_contents('php://input'), true);
    $alumniId = $_SESSION['alumni_id'];
    $name = $input['name'] ?? null;
    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;
    $job = $input['job'] ?? null; // fixed typo from 'jop' to 'job'

    if (!$alumniId) {
        echo json_encode(["status" => 400, "msg" => "alumni_id is required"]);
        exit;
    }

    $updated = $alumni->update($alumniId, $name, $email, $password, $job);

    if (!$updated) {
        echo json_encode(["status" => 300, "msg" => "Cannot update"]);
        exit;
    }

    echo json_encode([
        "status" => 201,
        "msg" => "Updated successfully"
    ]);

} catch (\Throwable $th) {
    echo json_encode([
        "status" => 500,
        "msg" => "An error occurred",
        "error" => $th->getMessage()
    ]);
}
