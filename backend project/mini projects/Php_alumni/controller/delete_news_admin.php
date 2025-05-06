<?php
require_once(BASE_PATH . '/models/news.php');
$allowed_origin = "http://localhost:5500"; // <-- your frontend origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();

    $input = json_decode(file_get_contents('php://input'), true);


    if (!isset($_SESSION['admin_id'])) {
        echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
        exit();
    }

    $news_id = $input['id_news'] ?? null;

    if (!$news_id) {
        echo json_encode(["status" => "400", "msg" => "Missing news ID"]);
        exit();
    }

    $news = new News();

    try {
        $deleted = $news->delete($news_id);
        if ($deleted) {
            echo json_encode(["status" => "200", "msg" => "News deleted successfully"]);
        } else {
            echo json_encode(["status" => "404", "msg" => "News not found or failed to delete"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => $e->getMessage()]);
    }
}
?>
