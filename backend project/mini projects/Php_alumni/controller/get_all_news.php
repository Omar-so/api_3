<?php
require_once(BASE_PATH . '/models/news.php');
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    session_start();

    $news = new News(); 

    try {
        $allNews = $news->getAll(); 
        echo json_encode(["status" => "200", "data" => $allNews]);
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
