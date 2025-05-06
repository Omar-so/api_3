<?php
require_once(BASE_PATH . '/models/Alumni.php');
$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

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
