<?php
require_once(BASE_PATH . '/models/news.php');
session_start();
error_log("Session ID: " . session_id()); // Logs session ID to the error log

// Set proper CORS headers
$allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight request handling
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['admin_name'])) {
        echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
        exit();
    }

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    $title = $input['title_news'] ?? null;
    $content = $input['content_news'] ?? null;
    $adminId = $_SESSION['admin_id'];

    if (!$title || !$content) {
        echo json_encode(['status' => '400', 'msg' => 'Missing title or content']);
        exit();
    }

    $news = new news();

    try {
        $newsCreated = $news->create($adminId, $title, $content);

        if ($newsCreated) {
            echo json_encode([
                "status" => "201",
                "msg" => "News created successfully",
                "data" => $newsCreated
            ]);
        } else {
            echo json_encode(["status" => "500", "msg" => "Failed to create news"]);
        }
    } catch (Exception $e) {
        echo json_encode([
            "status" => "500",
            "msg" => "An error occurred: " . $e->getMessage()
        ]);
    }
}
?>
