<?php
require_once(BASE_PATH . '/models/Alumni.php');

// Handle CORS
$allowedOrigins = [
    'http://localhost:5500', 
    'http://127.0.0.1:5500',
    'http://localhost:8000',
    'http://127.0.0.1:8000'
    // Add other origins as needed
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://localhost:5500"); // Default
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

try {
    $alumni = new Alumni();

    // Get input from either POST or GET
    $input = json_decode(file_get_contents('php://input'), true) ?? $_REQUEST;
    $alumniId = $input['alumni_id'] ?? null;

    if (!$alumniId) {
        http_response_code(400);
        echo json_encode(["status" => 400, "msg" => "alumni_id is required"]);
        exit;
    }

    $alumniData = $alumni->getById($alumniId);

    if (!$alumniData) {
        http_response_code(404);
        echo json_encode(["status" => 404, "msg" => "There is no alumni with this ID"]);
        exit;
    }

    http_response_code(200);
    echo json_encode([
        "status" => 200,
        "msg" => "Success",
        "data" => $alumniData
    ]);

} catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode([
        "status" => 500,
        "msg" => "An error occurred",
        "error" => $th->getMessage()
    ]);
}