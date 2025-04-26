<?php
require_once(BASE_PATH . '/models/news.php');

header(header: 'Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($_SESSION['admin_id'])) {
        echo json_encode(["status" => "401", "msg" => "Unauthorized"]);
        exit();
    }



    $title = $input['title_news'];
    $content = $input['content_news'];
    $adminId = $_SESSION['admin_id'];  // Get the logged-in admin's ID from the session
    
    if(!$title || !$content || !$adminId) {
        echo json_encode(['status'=> '400','msg'=> 'Missing data']);
    }
    $news = new news();

    


    try {
        $newsCreated = $news->create($adminId, $title, $content);
        
        if ($newsCreated) {
            echo json_encode(["status" => "201", "msg" => "news created successfully" ,"data" => $newsCreated]);
        } else {
            echo json_encode(["status" => "500", "msg" => "Failed to create news"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "500", "msg" => "An error occurred: " . $e->getMessage()]);
    }
  }
?>
