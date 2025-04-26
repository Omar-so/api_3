<?php
require_once(BASE_PATH . '/models/Alumni.php');
header(header: 'Content-Type: application/json');

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
