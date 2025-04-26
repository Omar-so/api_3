<?php
require_once(BASE_PATH . '/models/news.php');
header(header: 'Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    session_start();

    $news = new News(); // Make sure your class is named 'News'

    try {
        $allNews = $news->getAll(); // This should return an array or data

        echo json_encode(["status" => "200", "data" => $allNews]);
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
